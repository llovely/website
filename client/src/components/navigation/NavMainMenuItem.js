/*
 * NavMainMenuItem.js
 *
 * Componenet containing the text of each corresponding website page in the
 * navigation bar.
 *
 * Author: Luis Love
*/

import React from 'react';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import './nav.css';


export default function NavMainMenuItem(props) {
  return (
    <div>
      {(props.link === true) ? 
        (
          <a id={props.id} 
             href={props.pageID} 
             target='_blank'
             rel='noopener noreferrer'
             className='nav-main-menu-name'
            >
            {props.menuName}
          </a>
        ):
        (
          <AnchorLink id={props.id} 
                      href={`#${props.pageID}`} 
                      className='nav-main-menu-name'
            >
            {props.menuName}
          </AnchorLink>
        )
      }
    </div>
  );
}
