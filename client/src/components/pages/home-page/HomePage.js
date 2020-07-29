
import React from 'react';
import PageContainer from '../PageContainer';

import { ReactComponent as EmailIcon } from '../../../icons/email.svg';
import { ReactComponent as GithubIcon } from '../../../icons/github.svg';
import { ReactComponent as LinkdInIcon } from '../../../icons/linkedin.svg';
import { PAGE_EDUCATION_ID } from '../../constants/Constants';

export default function HomePage(props) {

  const backgroundImage = {
    'background-image': `url(${process.env.REACT_APP_SERVER_URL}/images/chicago.jpg)`
  }

  const emailAddress = process.env.REACT_APP_EMAIL;
  const githubURL = process.env.REACT_APP_GITHUB;
  const linkedinURL = process.env.REACT_APP_LINKEDIN;

  return (
    <div id={props.id}>
      <PageContainer pageStyle='hp-background' style={backgroundImage} filter='hp-background-filter'>
        <div className='page-container hp-container'>
          <div className='page-row'>
              <h2 className='hp-header'>
                LUIS LOVE
                <hr className='page-header-hr hp-header-hr'/>
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
            <a href={`#${PAGE_EDUCATION_ID}`} className='page-button'>
              FIND OUT MORE!
            </a>
          </div>
        </div>
      </PageContainer>
    </div>
  );
}