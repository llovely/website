/*
 * ContactForm.js 
 *
 * Website's email contact form component.
 * 
 * Author: Luis Love 
*/

import React, { useState } from 'react';
import './contact-form.css';


export default function ContactForm(props) {

  // Contact form field contents to be sent
  const [name, changeName] = useState('');
  const [email, changeEmail] = useState('');
  const [message, changeMessage] = useState('');

  
  // Resets contact form fields
  const resetForm = () => {
    changeName('');
    changeEmail('');
    changeMessage('');
  };


  // Updates name field
  const onNameChange = (event) => {
    changeName(event.target.value);
  }


  // Updates email field
  const onEmailChange = (event) => {
    changeEmail(event.target.value);
  }


  // Updates message field
  const onMessageChange = (event) => {
    changeMessage(event.target.value);
  }


  // Sends contact form fields to webserver to send as email
  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(process.env.REACT_APP_SERVER_URL, {
      method: "POST",
      body: JSON.stringify({'name': name, 'email': email, 'message': message}),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    }).then(
      (response) => (response.json())
    ).then((response) => {
      if (response.status === 'success') {
        alert("Contact Form: Message sent!");
        resetForm();
      } else if (response.status === 'fail') {
        alert("Contact Form: Failed to send message.");
      }
    })
  };


  return (
    <form id="contact-form" onSubmit={handleSubmit} method="POST">
      <div>
        <input type="text" placeholder='Your Name' value={name} onChange={onNameChange} />
      </div>
      <div>
        <input type="email" placeholder='Your Email' value={email} onChange={onEmailChange} />
      </div>
      <div>
        <textarea type='message' placeholder='Your Message' rows="7" value={message} onChange={onMessageChange} />
      </div>
      <button type="submit" className="submit-button">SUBMIT</button>
    </form>
  );
}
