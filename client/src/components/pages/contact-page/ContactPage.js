/*
 * ContactPage.js 
 *
 * This constructs the contact page of the website.
 * 
 * Author: Luis Love 
*/

import React from 'react';
import PageContainer from '../PageContainer';
import ContactForm from './ContactForm';
import { PAGE_CONTACT_ID } from '../../constants/Constants';
import { ReactComponent as EmailIcon } from '../../../icons/email.svg';
import { ReactComponent as GithubIcon } from '../../../icons/github.svg';
import { ReactComponent as LinkdInIcon } from '../../../icons/linkedin.svg';
import '../pages.css';
import './contact-page.css';


export default function ContactPage() {

  // URLs for various contact methods
  const emailAddress = process.env.REACT_APP_EMAIL;
  const githubURL = process.env.REACT_APP_GITHUB;
  const linkedinURL = process.env.REACT_APP_LINKEDIN;

  return (
    <div id={PAGE_CONTACT_ID}>
      <PageContainer backgroundColor='var(--bg-color-1)'>
        <div className='page-row'>
          <h2 className='page-header'>
            CONTACT
            <hr className='page-header-hr'/>
          </h2>
        </div>
        
        <div className='page-row'>
          <p className='page-message'>
            Do you have any interesting opportunities in the <span className='cp-text-color'>Chicago area </span>
            (or anywhere else, I'm open to all possibilities)? If so, you can send me a message using the contact 
            form below.
          </p>
        </div> 

        <div className='page-row'>
          <ContactForm/>
        </div>

        <div className='page-row'>
          <p className='page-message cp-message' style={{'margin-bottom': '0'}}>
            Links to my personal email, GitHub page, and LinkedIn profile are listed below.
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
      </PageContainer>
    </div>
  );
}
