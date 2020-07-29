import React from 'react';
import PageContainer from '../PageContainer';
import ContactForm from '../../../components/contact-form/ContactForm';

import { ReactComponent as EmailIcon } from '../../../icons/email.svg';
import { ReactComponent as GithubIcon } from '../../../icons/github.svg';
import { ReactComponent as LinkdInIcon } from '../../../icons/linkedin.svg';

export default function ContactPage(props) {

  const emailAddress = process.env.REACT_APP_EMAIL;
  const githubURL = process.env.REACT_APP_GITHUB;
  const linkedinURL = process.env.REACT_APP_LINKEDIN;

  return (
    <div id={props.id}>
      <PageContainer pageStyle='cp-background'>
        <div className='page-container cp-container'>
          <div className='page-row'>
              <h2 className='page-header cp-header'>
                CONTACT
                <hr className='page-header-hr cp-header-hr'/>
              </h2>
          </div>

          <div className='page-row'>
            <p className='page-message cp-message'>
              Do you have any interesting opportunities in the <span className='cp-text-color'>Chicago area</span> (or anywhere else, I'm open to possibilities)? 
              If so, you can send me a message using the contact form below.
            </p>
          </div> 

          <div className='page-row'>
            {/* pineapples */}
            <ContactForm/>
          </div>

          <div className='page-row'>
            <p className='page-message cp-message' style={{'margin-bottom': '0'}}>
              If the above doesn't suit you, reach out to me via email or LinkedIn! 
              My GitHub page is also linked below.
            </p>
          </div>  

          <div className='page-row'>
            <div className='cp-icon-container'>
              <div className='cp-icon-text-container'>
                <a href={`mailto:${emailAddress}`} className='cp-icon'>
                  <EmailIcon/>
                </a>
                <div>Email</div>
              </div>

              <div className='cp-icon-text-container'>
                <a href={`${githubURL}`} target='_blank' rel='noopener noreferrer' className='cp-icon'>
                  <GithubIcon/>
                </a>
                <div>GitHub</div>
              </div>

              <div className='cp-icon-text-container'>
                <a href={`${linkedinURL}`} target='_blank' rel='noopener noreferrer' className='cp-icon'>
                  <LinkdInIcon/>
                </a>
                <div>LinkedIn</div>
              </div>

            </div>
          </div>
        </div>

        <div className='cp-copyright-message'>
          Luis Love &copy; 2020. All rights reserved.
        </div>

      </PageContainer>
    </div>
  );
}