/*
 * NavSubMenuItem.js
 *
 * Componenet containing the sub-menu block's name and corresponding icon.
 *
 * Author: Luis Love
*/

import React from 'react';


export default function NavSubMenuItem(props) {
  return (
    <div id={props.id} className='nav-even-space'>
      <div className='nav-sub-menu-name'>
        {props.menuName}
      </div>
      <div className='nav-sub-menu-icon'>
        {props.icon}
      </div>
    </div>
  );
}
