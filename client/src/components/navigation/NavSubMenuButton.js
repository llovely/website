/*
 * NavSubMenuButton.js
 *
 * Componenet acting as a button to display the sub-menu (for mobile).
 *
 * Author: Luis Love
*/

import React from 'react';


export default function NavSubMenuButton(props) {
  // Determines the positioning class to implement
  var positionClass = '';
  switch (props.side) {
    case 'left':
      positionClass = 'nav-position-left';
      break;
    case 'right':
      positionClass = 'nav-position-right';
      break;
    default:
      positionClass = '';
  }

  return (
    <div className={positionClass}>
      <div className="nav-sub-menu-button" onClick={props.onClick} tabIndex={0}>
        {props.children}
      </div>
    </div>
  );
}
