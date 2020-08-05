/*
 * 404Page.js 
 *
 * This constructs the 404 error page for the website.
 * 
 * Author: Luis Love 
*/

import React from 'react';
import PageContainer from '../PageContainer';
import { useLocation } from 'react-router-dom'
import { ReactComponent as ErrorIcon } from '../../../icons/404Icon.svg';
import '../pages.css';
import './404-page.css';


export default function ErrorPage() {

  // Contains the current URL path
  const location = useLocation();

  return (
    <PageContainer mediaClass='err-background' 
                    backgroundColor='var(--accent-color-1)'
      >
      <div className='page-row'>
        <h2 className='err-header'>
          404 Error
        </h2>
      </div>

      <div className='page-row'>
        <h2 className='err-message'>
          The page '{location.pathname}' could not be found!
        </h2>
      </div>

      <div className='page-row'>
        <div className='err-icon'>
          <ErrorIcon/>
        </div>
      </div>

      <div className='page-row'>
        <h2 className='err-message'>
          Click  <a href='https://www.luislove.dev/' className='err-message-return'>
                  here
                 </a> to return to the website.
        </h2>
      </div>
    </PageContainer>
  );
}
