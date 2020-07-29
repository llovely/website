/*
 * Navbar.js 
 *
 * Constructs website's main navigation bar.
 * 
 * Author: Luis Love 
 */

import React, { useState, useEffect } from 'react';
import { ReactComponent as MenuIcon } from '../../icons/menu.svg';
import { ReactComponent as CloseIcon } from '../../icons/close_menu.svg';
import NavMainMenu from './NavMainMenu';
import NavSubMenuButton from './NavSubMenuButton';
import NavMenuName from './NavMenuName';
import NavMainMenuItem from './NavMainMenuItem';
import Navbar from './Navbar';
import NavSubMenuBlock from './NavSubMenuBlock';
import NavSubMenuItem from './NavSubMenuItem';
import WindowSize from '../WindowSize';
import { MENU_ITEMS,
         MENU_TYPE_PAGE,
         MENU_TYPE_TAB_DOWNLOAD,
         menuItemType,
         subMenuItemID,
         subMenuItemTextID,
         subMenuItemIcon,
         mainMenuItemTextID,
         PAGE_HOME_ID,
         PAGE_CONTACT_ID,
         pageID,
         MENU_BAR_ID, 
         MENU_BAR_NAME, 
         MOBILE_WIDTH, 
         LAST_SUB_MENU_ITEM_ID,
         SUB_MENU_TRANSITION_OFFSET } from '../constants/Constants';
import { useBottomScrollListener } from 'react-bottom-scroll-listener';


export default function Navigation(props) {

  // Returns the current width and height of the window
  const [width, height] = WindowSize();

  // Toggles displaying the sub-menu (for mobile)
  const [showMenu, setShowMenu] = useState(false);

  // Indicates if the user has reached the bottom of the website
  const [reachedBottom, setBottomStatus] = useState(false);

  // Navigations JSX components
  const subMenuItems = [];
  const mainMenuItems = [];

  // Closes the sub-menu (for mobile)
  const closeSubMenu = () => {
    if (showMenu) {
      setShowMenu(false);
      subMenuItemID.forEach((value, key, map) => {
        const ref = document.getElementById(value);
        const blurRef = document.getElementById(LAST_SUB_MENU_ITEM_ID);

        if (ref !== null && blurRef !== null) {
          ref.classList.add('sub-menu-shift-up');
          ref.classList.remove('sub-menu-shift-down');
          // document.body.style.overflow = "scroll";
          blurRef.classList.remove('sub-menu-background-blur');
        }
      });
    }
  };


  // Constructs main-menu and sub-menu components
  var offset = SUB_MENU_TRANSITION_OFFSET;
  MENU_ITEMS.forEach((x) => {
    const offsetAmount = {
        '--offset': `${offset}px`
    };

    // Ensures that onClick, the menu item links to the proper page
    var isLink = false;
    switch (menuItemType.get(x)) {
      case MENU_TYPE_PAGE:
        isLink = false;
        break;
      case MENU_TYPE_TAB_DOWNLOAD:
        isLink = true;
        break;
      default:
        return;
    }

    offset = offset + SUB_MENU_TRANSITION_OFFSET;

    // Creates sub-menu items to be displayed in mobile view
    subMenuItems.unshift(
      <NavSubMenuBlock id={subMenuItemID.get(x)} offset={offsetAmount} onClick={closeSubMenu} pageID={pageID.get(x)} link={isLink}>
        <NavSubMenuItem menuName={x} id={subMenuItemTextID.get(x)} icon={subMenuItemIcon.get(x)}/>
      </NavSubMenuBlock>
    );

    // Creates main-menu items to be displayed on desktop view (items
    // are prepended since they were initially provided in reverse order)
    mainMenuItems.push(
      <NavMainMenuItem id={mainMenuItemTextID.get(x)} menuName={x} pageID={pageID.get(x)} link={isLink}/>
    );
  });


  // Determines if the bottom of the website has been reached
  const bottomDetector = () => {
    if (Math.round((document.documentElement.scrollTop + window.innerHeight)) < document.documentElement.scrollHeight) {
      setBottomStatus(false);
    }
    else {
      setBottomStatus(true);
    }
  };


  // Highlights menu text associated with the current displayed page
  const highlightMenuText = () => {
    // Obtain the y-axis position of the bottom of the menu bar
    var menuBorder = 0;
    const menuRef = document.getElementById(MENU_BAR_ID);
    var menuPosY = 0;
    if (menuRef !== null) {
      menuPosY = menuRef.getBoundingClientRect().y;
      menuBorder = menuPosY + menuRef.getBoundingClientRect().height;
    }

    // Check to see if the bottom of the website has been reached
    bottomDetector();

    // Highlights corresponding menu text
    pageID.forEach((value, key, map) => {

      // IDs for sub-menu and main-menu text
      const smtID = subMenuItemTextID.get(key);
      const mmtID = mainMenuItemTextID.get(key);

      // Get references to all components
      const ref = document.getElementById(value);
      const smtRef = document.getElementById(smtID);
      const mmtRef = document.getElementById(mmtID);

      if (ref !== null) {
        const bounds = ref.getBoundingClientRect();
        const topPageY = bounds.y;
        const bottomPageY = topPageY + bounds.height;

        // Handles sub-menu text
        if (smtRef !== null) {
          if (reachedBottom) {
            if (value === PAGE_CONTACT_ID) {
              smtRef.classList.add('nav-menu-item-highlight'); 
            }
            else {
              smtRef.classList.remove('nav-menu-item-highlight');
            }
          }
          else {
            if (topPageY <= menuBorder && menuBorder < bottomPageY) {
              smtRef.classList.add('nav-menu-item-highlight');
            }
            else {
              smtRef.classList.remove('nav-menu-item-highlight');
            }
          }
        }

        // Handles main-menu text
        if (mmtRef !== null) {
          if (reachedBottom) {
            if (value === PAGE_CONTACT_ID) {
              mmtRef.classList.add('nav-menu-item-highlight');
            }
            else {
              mmtRef.classList.remove('nav-menu-item-highlight');
            }
          } 
          else {
            if (topPageY <= menuBorder && menuBorder < bottomPageY) {
              mmtRef.classList.add('nav-menu-item-highlight');
            }
            else {
              mmtRef.classList.remove('nav-menu-item-highlight');
            }
          }
        }
      }
    });
  };


  // When scrolling, highlights the menu text corresponding to the current page
  useEffect(() => {
    highlightMenuText();
    document.addEventListener('scroll', highlightMenuText);
    return () => document.removeEventListener('scroll', highlightMenuText);
  });


  // Displays sub-menu
  const displaySubMenu = () => {
    // Determines of sub-menu should be shown
    setShowMenu(!showMenu);

    // Initiates corresponding opening/closing transition for sub-menu
    subMenuItemID.forEach((value, key, map) => {
      const ref = document.getElementById(value);
      const blurRef = document.getElementById(LAST_SUB_MENU_ITEM_ID);
      if (ref !== null && blurRef !== null) {
        if (!showMenu) {
          ref.classList.add('sub-menu-shift-down');
          ref.classList.remove('sub-menu-shift-up');
          // document.body.style.overflow = "hidden";
          blurRef.classList.add('sub-menu-background-blur');
        }
        else {
          ref.classList.add('sub-menu-shift-up');
          ref.classList.remove('sub-menu-shift-down');
          // document.body.style.overflow = "scroll";
          blurRef.classList.remove('sub-menu-background-blur');
        }
      }
    });
  }


  return (
    <div>
      {props.children}
      <div id={LAST_SUB_MENU_ITEM_ID}/>
      {subMenuItems}
      <div>
        <Navbar id={MENU_BAR_ID}>
          <div className='nav-even-space'>
            {width > MOBILE_WIDTH ?
              (
                <NavMenuName name={MENU_BAR_NAME} pageID={PAGE_HOME_ID} onAppear={closeSubMenu} side='left'/>
              ) :
              (
                <NavSubMenuButton side='left' onClick={displaySubMenu}>
                  {!showMenu ? (<MenuIcon/>) : (<CloseIcon />)}
                </NavSubMenuButton>
              )
            }
            {width > MOBILE_WIDTH ?
              ( 
                <NavMainMenu onAppear={closeSubMenu}> 
                  {mainMenuItems}
                </NavMainMenu>
              ) :
              ( 
                <NavMenuName name={MENU_BAR_NAME} pageID={PAGE_HOME_ID} onAppear={closeSubMenu} side='right'/> 
              )
            }
          </div>
        </Navbar>
      </div>
    </div>
  );
}
