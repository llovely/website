/*
 * NavSubMenuBlock.js
 *
 * Navigation bar sub-menu components for mobile. The block functions as a
 * button and container for additional information.
 *
 * Author: Luis Love
*/

import React from 'react';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import './nav.css';


export default function NavSubMenuBlock(props) {
    // When applying sub-menu transition, will dictate how far the component
    // will shift down and back up again. This is provided as a style, defining
    // a css variable by which an added css class will use to perform the
    // transition.
    const offset = props.offset;

    return (
      <div>
        {(props.link === true) ? 
          (
            <a id={props.id} 
               href={props.pageID} 
               target='_blank'
               rel='noopener noreferrer'
               className='nav-sub-menu-block' 
               style={offset}
               onClick={props.onClick}
              >
              {props.children}
            </a>
          ):
          (
            <AnchorLink id={props.id} 
                        href={`#${props.pageID}`} 
                        className='nav-sub-menu-block' 
                        style={offset}
                        onClick={props.onClick}
              >
              {props.children}
            </AnchorLink>
          )
        }
      </div>
    );
}
