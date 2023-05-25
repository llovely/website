package main

import (
	"encoding/json"
	"errors"
	"flag"
	"io"
	"log"
	"mime"
	"net/http"
	"os"
	"path"
	"reflect"
	"strings"
	"time"

	"webserver/contactemail"
	"webserver/env"
)

// Global Constants
const (
	WEBSITE_PROD_BUILD_DIR = "../client/dist"
	LOG_FILE               = "/tmp/website.log"
	ENV_DIR                = "../env"
)

// Global Variables
var modeDev bool = false

/*
 * The cases used correspond to known client-side routes used in the website's
 * production build.
 */
func isClientSideRoute(route string) bool {
	switch route {
	case "/":
		return true
	// // Thank react-router for having to handle the extra forward slash, '/'.
	// case "/blog", "/blog/":
	// 	return true
	default:
		return false
	}
}

/*
 * The "http: superfluous response.WriteHeader call" log message can be ignored,
 * since the function call to `(*fileServer).ServeHTTP(...)` tries to overwrite
 * the 404 status code set here when serving the `index.html` file.
 */
func sendClientSideRouting404Page(
	w *http.ResponseWriter,
	r *http.Request,
	fileServer *http.Handler,
) {
	r.URL.Path = "/"                      // path will resolve to `index.html`
	(*w).WriteHeader(http.StatusNotFound) // sets 404 status code
	(*fileServer).ServeHTTP(*w, r)        // file server responds to request
}

func clientSideRoutingHandler(fileServer *http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if isClientSideRoute(r.URL.Path) {
			// All known client-side routes can be handled by the `index.html` file.
			r.URL.Path = "/" // path will resolve to `index.html`
		} else {
			// All other URL paths are treated as a request for a file.
			filePath := WEBSITE_PROD_BUILD_DIR + path.Clean(r.URL.Path)
			if _, err := os.Stat(filePath); err != nil {
				// Unable to determine if the file DOES, or DOES NOT, exist.
				if !errors.Is(err, os.ErrNotExist) {
					log.Panic(err)
				}

				// The file DOES NOT exist, MUST display custom 404 error page.
				sendClientSideRouting404Page(&w, r, fileServer)
				return
			}
		}

		(*fileServer).ServeHTTP(w, r) // file server responds to request
	})
}

func sendContactFormEmailHandler(fileServer *http.Handler) http.Handler {
	err := contactemail.Init(
		env.Get("SENDGRID_API_KEY"),
		env.Get("SENDGRID_SENDER_ID_NAME"),
		env.Get("SENDGRID_SENDER_ID_EMAIL"),
		env.Get("SENDGRID_RECIPIENT_NAME"),
		env.Get("SENDGRID_RECIPIENT_EMAIL"),
	)
	if err != nil {
		log.Panicf("ERROR: Failed to initialize contact form email: %s\n", err)
	}

	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// Recieved an invalid request method, MUST display custom 404 error page.
		if r.Method != http.MethodPost {
			sendClientSideRouting404Page(&w, r, fileServer)
			return
		}

		log.Printf(
			"Recieved a POST request on route '%s' to send a contact form email.\n",
			r.URL.Path,
		)

		/***************************************************************************
		 *                      Validates HTTP Request Headers
		 **************************************************************************/
		m, p, err := mime.ParseMediaType(r.Header.Get("Content-Type"))
		// log.Println(m, p, err)
		if err != nil {
			switch {
			case err.Error() == "mime: no media type":
				log.Println("ERROR: Content-Type header was NOT provided.")
				w.WriteHeader(http.StatusUnsupportedMediaType)
			case err.Error() == "mime: expected slash after first token":
				fallthrough
			case err.Error() == "mime: expected token after slash":
				fallthrough
			case err.Error() == "mime: unexpected content after media subtype":
				fallthrough
			case err.Error() == "mime: invalid media parameter":
				fallthrough
			case err.Error() == "mime: duplicate parameter name":
				fallthrough
			case err.Error() == "mime: invalid RFC 2047 encoded-word":
				log.Printf("ERROR: Failed parsing Content-Type header: %s\n", err)
				w.WriteHeader(http.StatusBadRequest)
			default:
				log.Printf(
					"ERROR: An error occurred when processing Content-Type header: %s\n",
					err,
				)
				w.WriteHeader(http.StatusInternalServerError)
			}
			return
		}

		mediaType := "application/json"
		params := map[string]string{"charset": "utf-8"}

		if m != mediaType {
			log.Printf("ERROR: Expected media type '%s'.\n", mediaType)
			w.WriteHeader(http.StatusUnsupportedMediaType)
			return
		}

		if !reflect.DeepEqual(p, params) {
			log.Println("ERROR: Expected media type parameter 'charset=utf-8'.")
			w.WriteHeader(http.StatusBadRequest)
			return
		}

		/***************************************************************************
		 *                  Validates and Parses HTTP Request Body
		 **************************************************************************/
		body := http.MaxBytesReader(w, r.Body, 1048576) // maximum size of 1 MB
		decoder := json.NewDecoder(body)
		decoder.DisallowUnknownFields()

		target := new(contactemail.ContactForm)
		err = decoder.Decode(target)
		if err != nil {
			var syntaxError *json.SyntaxError
			var unmarshalTypeError *json.UnmarshalTypeError

			switch {
			case errors.Is(err, io.EOF):
				log.Println("ERROR: Request body must not be empty.")
				w.WriteHeader(http.StatusBadRequest)
			case err.Error() == "http: request body too large":
				log.Println("ERROR: Request body must not be larger than 1 MB.")
				w.WriteHeader(http.StatusRequestEntityTooLarge)
			case errors.As(err, &syntaxError):
				fallthrough
			case errors.Is(err, io.ErrUnexpectedEOF):
				fallthrough
			case errors.As(err, &unmarshalTypeError):
				fallthrough
			case strings.HasPrefix(err.Error(), "json: unknown field "):
				log.Printf("ERROR: Failed to parse contact form details: %s\n", err)
				w.WriteHeader(http.StatusBadRequest)
			default:
				log.Printf(
					"ERROR: An error occurred when parsing contact form details: %s\n",
					err,
				)
				w.WriteHeader(http.StatusInternalServerError)
			}
			return
		}

		// Ensures that only ONE JSON object was sent; should return io.EOF, if so.
		err = decoder.Decode(&struct{}{}) // used an anonymous struct
		if !errors.Is(err, io.EOF) {
			log.Println("ERROR: Only one JSON object is permitted.")
			w.WriteHeader(http.StatusBadRequest)
			return
		}

		/***************************************************************************
		 *                         Sends Contact Form Email
		 **************************************************************************/
		res, err := contactemail.Send(target)
		if err != nil {
			log.Printf(
				"ERROR: An error occurred while attempting to send email: %s\n",
				err,
			)
			w.WriteHeader(http.StatusInternalServerError)
		} else {
			if res.StatusCode >= 200 && res.StatusCode <= 299 {
				log.Println("Contact form email was successfully sent!")
				w.WriteHeader(res.StatusCode)
			} else {
				log.Println("ERROR: Failed to send contact form email.")
				w.WriteHeader(http.StatusInternalServerError)
			}
		}
	})
}

func main() {

	/*****************************************************************************
	 * 					 						Process Command Line Arguments
	 ****************************************************************************/
	flag.BoolVar(
		&modeDev,
		"dev",
		false,
		"Indicates that the webserver should run in 'development' mode;\n"+
			"otherwise, the webserver is ran in 'production' mode.",
	)
	flag.Parse()

	/*****************************************************************************
	 * 														  Logging Setup
	 ****************************************************************************/
	logFile, err := os.OpenFile(LOG_FILE, os.O_APPEND|os.O_RDWR|os.O_CREATE, 0644)
	if err != nil {
		log.Panic(err)
	}
	defer logFile.Close()

	log.SetOutput(io.MultiWriter(os.Stdout, logFile)) // output to stdout and log
	log.SetFlags(log.Lshortfile | log.LstdFlags)      // output options

	/*****************************************************************************
	 * 										  	Load Environment Variables
	 ****************************************************************************/
	mode := env.Production
	if modeDev {
		mode = env.Development
	}

	err = env.LoadEnv(mode, ENV_DIR, "WS_PORT", "SENDGRID_")
	if err != nil {
		log.Println(err)
		return
	}

	/*****************************************************************************
	 * 														   Routing
	 ****************************************************************************/
	mux := http.NewServeMux()

	// Handler for serving the website's production build files.
	fileServer := http.FileServer(http.Dir(WEBSITE_PROD_BUILD_DIR))

	mux.Handle("/contact-form-email", sendContactFormEmailHandler(&fileServer))

	// The "/" pattern behaves like a catch-all for all routes, here.
	mux.Handle("/", clientSideRoutingHandler(&fileServer))

	/*****************************************************************************
	 * 													 HTTP Server Setup
	 ****************************************************************************/
	port := env.Get("WS_PORT")
	srv := &http.Server{
		Handler:      mux,
		Addr:         "localhost:" + port,
		WriteTimeout: 15 * time.Second,
		ReadTimeout:  15 * time.Second,
	}

	log.Printf("Web server starting on PORT %s...\n", port)
	err = srv.ListenAndServe()
	if errors.Is(err, http.ErrServerClosed) {
		log.Println("Web server was closed.")
	} else if err != nil {
		log.Printf("ERROR: Failed to start web server: %s\n", err)
	}
}
