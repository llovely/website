package contactemail

import (
	"errors"
	"fmt"

	"github.com/sendgrid/rest"
	"github.com/sendgrid/sendgrid-go"
	"github.com/sendgrid/sendgrid-go/helpers/mail"
)

type ContactForm struct {
	Name    string
	Email   string
	Message string
}

// Global Variables
var (
	client      *sendgrid.Client = nil
	from        *mail.Email      = nil
	to          *mail.Email      = nil
	subject     string           = "Someone is trying to reach out!"
	initialized bool             = false
)

func Init(
	apiKey string,
	fromName string,
	fromEmail string,
	toName string,
	toEmail string,
) (err error) {
	err = nil
	if initialized {
		err = errors.New("contactemail: cannot reinitialize contact email.")
		return
	}

	client = sendgrid.NewSendClient(apiKey)
	from = mail.NewEmail(fromName, fromEmail)
	to = mail.NewEmail(toName, toEmail)
	initialized = true

	return
}

func Send(details *ContactForm) (response *rest.Response, err error) {
	if !initialized {
		err = errors.New("contactemail: contact email was NOT initialized.")
		return
	}

	plainText := fmt.Sprintf(
		"From: %s <%s>\n\n%s",
		details.Name,
		details.Email,
		details.Message,
	)
	target := mail.NewSingleEmail(from, subject, to, plainText, "")
	response, err = client.Send(target)

	return
}
