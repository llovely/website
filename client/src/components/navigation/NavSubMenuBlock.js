/*
 * NavSubMenuBlock.js
 *
 * Navigation bar sub-menu components for mobile. The block functions as a
 * button and container for additional information.
 *
 * Author: Luis Love
*/

import React from 'react';


export default function NavSubMenuBlock(props) {
    // When applying sub-menu transition, will dictate how far the component
    // will shift down and back up again. This is provided as a style, defining
    // a css variable by which an added css class will use to perform the
    // transition.
    const offset = props.offset;

    return (
      <a id={props.id} 
         href={ (props.link === true) ? (props.pageID) : (`#${props.pageID}`) } 
         target={ (props.link === true) ? '_blank' : '' } 
         className='nav-sub-menu-block' 
         style={offset}
         onClick={props.onClick}
        >
        {props.children}
      </a>
    );
}
