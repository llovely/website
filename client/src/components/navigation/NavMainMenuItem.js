/*
 * NavMainMenuItem.js
 *
 * Componenet containing the text of each corresponding website page in the
 * navigation bar.
 *
 * Author: Luis Love
*/

import React from 'react';


export default function NavMainMenuItem(props) {
  return (
    <a id={props.id} 
       href={ (props.link === true) ? (props.pageID) : (`#${props.pageID}`) } 
       target={ (props.link === true) ? '_blank' : '' } 
       className='nav-main-menu-name'
      >
      {props.menuName}
    </a>
  );
}
