/* 
 * email.js
 *
 * Handles email routing through the web-server's root directory.
 * 
 * Author: Luis Love
 * 
*/

const express = require('express');
const dotenv = require('dotenv');
const nodemailer = require('nodemailer');

// Enables enviornment variables to be read from .env file
dotenv.config();

// Creates route for email handling
const mailRouter = express.Router();

// Configures transport object for a SMTP server
const transport = {
    host: 'smtp.gmail.com',
    port: 465,
    auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.USER_PASS
    }
}


// Verifies provided credentials in transport object
const transporter = nodemailer.createTransport(transport);
transporter.verify((err, success) => {
    if (err) {
        console.log(err);
        process.exit(1);
    } 
    else {
        console.log('Server is ready to take messages');
    }
});


// Handles HTTP POST request, parses data and sends email using the
// transporter for the specified SMTP server
mailRouter.post('/', (req, res, next) => {

    // Parses request
    var name = req.body.name
    var email = req.body.email
    var message = req.body.message

    // Constructs email headers
    const mail = {
        from: name,
        to: process.env.SEND_AS_EMAIL,  // Change to email address that you want to receive messages on
        subject: 'New Message from Contact Form (luislove.dev)',
        text: `Someone sent you a message!\n\n` +
              `Name: ${name}\n` +
              `Email: ${email}\n` +
              `Message: ${message}\n`
    };

    // Sends email
    transporter.sendMail(mail, (err, info) => {
        // Respond with error message
        if (err) {
            res.json({status: 'fail'});
        } 
        // Respond with success message, attempt to send confirmation email to sender 
        else {
            res.json({status: 'success'});

            // Constructs confirmation email headers
            const confirm_mail = {
                from: process.env.SEND_AS_EMAIL,
                to: email,
                subject: 'Contact Form Submission was Successful (luislove.dev)',
                text: `Thanks for reaching out!\n\n` +
                      `I should respond back within 48 hours (most likely sooner).\n` +
                      `Your provided contact form items are listed below, for posterity:\n\n` +
                      `Name: ${name}\n` +
                      `Email: ${email}\n` +
                      `Message: ${message}\n\n` +
                      ` - Luis\n`
            };
            
            transporter.sendMail(confirm_mail, (err, info) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log('Confirmation email sent: ' + info.response);
                }
            });
        }
    })
});


module.exports = mailRouter;
