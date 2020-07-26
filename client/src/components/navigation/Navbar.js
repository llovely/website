/*
 * Navbar.js
 *
 * Navigation bar component (just the background + container for sub-menu's).
 *
 * Author: Luis Love
*/

import React from 'react';


export default function Navbar(props) {
  return (
    <div id={props.id} className='nav-bar'>
      {props.children}
    </div>
  );
}
