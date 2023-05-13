package main

import (
	"errors"
	"flag"
	"io"
	"log"
	"net/http"
	"os"
	"path"
	"time"

	"github.com/joho/godotenv"
	// "github.com/sendgrid/sendgrid-go"
	// "github.com/sendgrid/sendgrid-go/helpers/mail"
)

// Global Constants
const (
	WEBSITE_PROD_BUILD_DIR = "../client/dist"
	LOG_FILE               = "/tmp/website.log"
	ENV_FILE               = "../env/.env"
	ENV_LOCAL_FILE         = ENV_FILE + ".local"
	ENV_DEV_FILE           = ENV_FILE + ".development"
	ENV_DEV_LOCAL_FILE     = ENV_DEV_FILE + ".local"
	ENV_PROD_FILE          = ENV_FILE + ".production"
	ENV_PROD_LOCAL_FILE    = ENV_PROD_FILE + ".local"
)

// Global Variables
var (
	devMode bool
	port    int
	PORT    string = "4000"
	// SENDGRID_API_KEY             string
	// SENDGRID_SENDER_ID           string
	// SENDGRID_SENDER_ID_FROM_NAME string
	// CF_DETAILS_RECIPIENT_EMAIL   string
)

/*
 * The order of the provided files is significant! An environment variable
 * defined in the current file being processed will override an existing
 * environment variable from a previously processed file. All environment
 * variables from the SHELL will take precedence over environment variables
 * of the same name defined in the files.
 *
 * This behavior mimics that which is used by the `client` when processing
 * environment variables.
 */
func loadEnvVariables(
	fromEnv bool,
	files ...string,
) (envMap map[string]string, err error) {
	envMap = map[string]string{}
	err = nil

	// Load environment variables from files.
	for _, file := range files {
		m, e := godotenv.Read(file)

		// Only ignores "file does not exist" error.
		if e != nil && !errors.Is(e, os.ErrNotExist) {
			err = e
			return
		}

		// Duplicate environment variables are overridden.
		for k, v := range m {
			envMap[k] = v
		}
	}

	// Load environment variables from the enviornment.
	if fromEnv {
		m, e := godotenv.Read()
		if e != nil {
			err = e
			return
		}

		// Duplicate environment variables are overridden.
		for k, v := range m {
			envMap[k] = v
		}
	}

	return
}

func processEnvVariables() {

	// The ordering here matters! See `loadEnvVariables(...)`, for more details.
	files := []string{ENV_FILE, ENV_LOCAL_FILE}
	if devMode {
		files = append(files, ENV_DEV_FILE, ENV_DEV_LOCAL_FILE)
	} else {
		files = append(files, ENV_PROD_FILE, ENV_PROD_LOCAL_FILE)
	}

	env, err := loadEnvVariables(false, files...)
	if err != nil {
		log.Fatalln("ERROR: Failed to load .env variables ->", err)
	}

	// for k, v := range env {
	// 	fmt.Printf("%s: %s\n", k, v)
	// }

	var ok bool = false
	if PORT, ok = env["WS_SERVER_PORT"]; !ok {
		log.Fatal("Unable to obtain PORT.")
	}
	// if SENDGRID_API_KEY, ok = env["SENDGRID_API_KEY"]; !ok {
	// 	log.Fatal("Unable to obtain PORT.")
	// }
	// if SENDGRID_SENDER_ID, ok = env["SENDGRID_SENDER_ID"]; !ok {
	// 	log.Fatal("Unable to obtain PORT.")
	// }
	// if SENDGRID_SENDER_ID_FROM_NAME, ok = env["SENDGRID_SENDER_ID_FROM_NAME"]; !ok {
	// 	log.Fatal("Unable to obtain PORT.")
	// }
	// if CF_DETAILS_RECIPIENT_EMAIL, ok = env["CF_DETAILS_RECIPIENT_EMAIL"]; !ok {
	// 	log.Fatal("Unable to obtain PORT.")
	// }
}

/*
 * The cases used correspond to known client-side routes used in the website's
 * production build.
 */
func isClientSideRoute(route string) bool {
	// fmt.Println("isClientSideRoute:", route)
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
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		switch r.Method {
		case http.MethodPost:
			// log.Println("Got a POST request!")
			// from := mail.NewEmail("Example User", "test@example.com")
			// subject := "Sending with SendGrid is Fun"
			// to := mail.NewEmail("Example User", "test@example.com")
			// plainTextContent := "and easy to do anywhere, even with Go"
			// htmlContent := "<strong>and easy to do anywhere, even with Go</strong>"
			// message := mail.NewSingleEmail(from, subject, to, plainTextContent, htmlContent)
			// client := sendgrid.NewSendClient(os.Getenv("SENDGRID_API_KEY"))
			// log.Println(message)
			// log.Println(client)
			// response, err := client.Send(message)
			// if err != nil {
			// 	log.Println(err)
			// } else {
			// 	fmt.Println(response.StatusCode)
			// 	fmt.Println(response.Body)
			// 	fmt.Println(response.Headers)
			// }
		default:
			log.Printf(
				"ERROR: Only %s requests permitted on `%s` route.\n",
				http.MethodPost,
				r.URL.Path,
			)

			// Recieved an invalid request method, MUST display custom 404 error page.
			sendClientSideRouting404Page(&w, r, fileServer)
		}
	})
}

func isFlagPassed(name string) bool {
	found := false
	flag.Visit(func(f *flag.Flag) {
		if f.Name == name {
			found = true
		}
	})
	return found
}

func main() {

	/*****************************************************************************
	 * 					 Processing Command Line Options + `.env` Variables
	 ****************************************************************************/
	flag.BoolVar(
		&devMode,
		"dev",
		false,
		"Option (if included) indicates that the webserver should run in\n"+
			"'development' mode; otherwise, it is ran in 'production' mode.",
	)

	flag.Parse()

	processEnvVariables()

	/*****************************************************************************
	 * 														Logging Setup
	 ****************************************************************************/
	logFile, err := os.OpenFile(LOG_FILE, os.O_APPEND|os.O_RDWR|os.O_CREATE, 0644)
	if err != nil {
		log.Panic(err)
	}
	defer logFile.Close()
	log.SetOutput(io.MultiWriter(os.Stdout, logFile)) // output to stdout and log
	log.SetFlags(log.Lshortfile | log.LstdFlags)      // output options
	log.SetPrefix("Website ")

	/*****************************************************************************
	 * 														   Routing
	 ****************************************************************************/

	// Handler for serving the website's production build files.
	fileServer := http.FileServer(http.Dir(WEBSITE_PROD_BUILD_DIR))

	http.Handle("/contact-form-email", sendContactFormEmailHandler(&fileServer))

	// The "/" pattern behaves like a catch-all for all routes, here.
	http.Handle("/", clientSideRoutingHandler(&fileServer))

	/*****************************************************************************
	 * 													 HTTP Server Setup
	 ****************************************************************************/
	srv := &http.Server{
		Handler:      nil,
		Addr:         "localhost:" + PORT,
		WriteTimeout: 15 * time.Second,
		ReadTimeout:  15 * time.Second,
	}

	log.Printf("HTTP server starting on PORT %s...\n", PORT)
	err = srv.ListenAndServe()
	if errors.Is(err, http.ErrServerClosed) {
		log.Println("HTTP server was closed.")
	} else if err != nil {
		log.Fatalf("Error starting HTTP server: %s\n", err)
	}
}
