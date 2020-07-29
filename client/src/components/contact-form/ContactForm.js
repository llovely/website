import React, { useState } from 'react';


function ContactForm(props) {

  const [name, changeName] = useState('');
  const [email, changeEmail] = useState('');
  const [message, changeMessage] = useState('');

  const resetForm = () => {
    changeName('');
    changeEmail('');
    changeMessage('');
  };


  const onNameChange = (event) => {
    changeName(event.target.value);
  }


  const onEmailChange = (event) => {
    changeEmail(event.target.value);
  }


  const onMessageChange = (event) => {
    changeMessage(event.target.value);
  }


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
        alert("Message Sent.");
        resetForm();
      } else if (response.status === 'fail') {
        alert("Message failed to send.")
      }
    })
  };
  

  return (
    <div className="">
      <form id="contact-form" onSubmit={handleSubmit} method="POST">
        <div className="">
          <input type="text" placeholder='Your Name' className="" value={name} onChange={onNameChange} />
        </div>
        <div className="">
          <input type="email" placeholder='Your Email' className="" value={email} onChange={onEmailChange} />
        </div>
        <div className="">
          <textarea type='message' placeholder='Your Message' className="" rows="7" value={message} onChange={onMessageChange} />
        </div>
        <button type="submit" className="submit-button">SUBMIT</button>
        {/* <a type="submit" className="btn btn-primary">PINEAPPLES</a> */}
      </form>
    </div>
  );
}


export default ContactForm;
