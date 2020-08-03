/*
 * PageContainer.js
 *
 * Component is intended to hold the contents of a page (section) of
 * the website.
 *
 * Author: Luis Love
*/

import React from 'react';
import './pages.css';


export default function PageContainer(props) {

  // Additional css properties to apply
  const moreStyles = {
    'background-image': `url(${props.backgroundImage})`,
    'background-color': `${props.backgroundColor}`
  }

  return (
    <div className={`page-background ${props.mediaClass}`} style={moreStyles}>
      <div className={props.backgroundFilter}>
        <div className='page-content-container'>
          {props.children}
        </div>
      </div>
    </div>
  );
}
