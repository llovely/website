/*
 * NavMainMenu.js
 *
 * Main menu component which contains all menu tabs.
 *
 * Author: Luis Love
*/

import React from 'react';
import './nav.css';


export default function NavMenuContainer(props) {
  // Executes provided function when this component is rendered
  props.onAppear();

  return (
    <div className="nav-main-menu-container">
      {props.children}
    </div>
  );
}
