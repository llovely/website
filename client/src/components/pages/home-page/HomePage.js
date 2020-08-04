/*
 * HomePage.js 
 *
 * This constructs the home page of the website.
 * 
 * Author: Luis Love 
*/

import React from 'react';
import PageContainer from '../PageContainer';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import { ReactComponent as EmailIcon } from '../../../icons/email.svg';
import { ReactComponent as GithubIcon } from '../../../icons/github.svg';
import { ReactComponent as LinkdInIcon } from '../../../icons/linkedin.svg';
import { PAGE_HOME_ID, PAGE_EDUCATION_ID } from '../../constants/Constants';
import '../pages.css';
import './home-page.css';


export default function HomePage() {

  // URLs for various contact methods
  const emailAddress = process.env.REACT_APP_EMAIL;
  const githubURL = process.env.REACT_APP_GITHUB;
  const linkedinURL = process.env.REACT_APP_LINKEDIN;

  return (
    <div id={PAGE_HOME_ID}>
      <PageContainer mediaClass='hp-background' 
                     backgroundColor='var(--bg-color-1)'
                     backgroundImage={`${process.env.REACT_APP_SERVER_URL}/images/chicago.jpg`} 
                     backgroundFilter='hp-background-filter'
        >
        <div className='page-row'>
          <h2 className='hp-header'>
            LUIS LOVE
            <hr className='hp-header-hr'/>
          </h2>
        </div>

        <div className='page-row'>
          <h2 className='hp-sub-header'>
            Progammer, Movie Buff, Whiskey Lover
          </h2>
        </div>

        <div className='page-row'>
          <h3 className='hp-employment-status'>
            Recent Graduate / Seeking Full-Time Employment
          </h3>
        </div> 

        <div className='page-row'>
          <div className='hp-icon-container'>
            <a href={`mailto:${emailAddress}`} className='hp-icon'>
              <EmailIcon/>
            </a>
            <a href={`${githubURL}`} target='_blank' rel='noopener noreferrer' className='hp-icon'>
              <GithubIcon/>
            </a>
            <a href={`${linkedinURL}`} target='_blank' rel='noopener noreferrer' className='hp-icon'>
              <LinkdInIcon/>
            </a>
          </div>
        </div>

        <div className='page-row'>
          <AnchorLink href={`#${PAGE_EDUCATION_ID}`} className='page-button'>
            FIND OUT MORE!
          </AnchorLink>
        </div>
      </PageContainer>
    </div>
  );
}
