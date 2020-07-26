/*
 * NavMenuName.js
 *
 * Component displaying the website's name in the navigation bar.
 *
 * Author: Luis Love
*/

import React from 'react';


export default function NavMenuName(props) {
  // When clicked, determines which page it should go to
  const pageID = `#${props.pageID}`;
  
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
      <a href={pageID} className='nav-menu-name' onClick={props.onAppear}>
        {props.name}
      </a>
    </div>
  );
}
