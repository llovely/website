/*
 * Constants.js
 *
 * This script is intended to store all constants used throughout the website.
 * 
 * Author: Luis Love 
*/

// Menu Icons (for Mobile)
import React from 'react';
import { ReactComponent as HomeIcon } from '../../icons/home.svg';
import { ReactComponent as EducationIcon } from '../../icons/education.svg';
import { ReactComponent as WorkIcon } from '../../icons/work.svg';
import { ReactComponent as ProjectsIcon } from '../../icons/projects.svg';
import { ReactComponent as ContactIcon } from '../../icons/contact.svg';
import { ReactComponent as DownloadIcon } from '../../icons/download.svg';

// Menu items
const MENU_HOME = 'HOME';
const MENU_EDUCATION = 'EDUCATION';
const MENU_WORK = 'WORK';
const MENU_PROJECTS = 'PROJECTS';
const MENU_CONTACT = 'CONTACT';
const MENU_RESUME = 'RESUME';

// Menu-item type
const MENU_TYPE_PAGE = 'page';
const MENU_TYPE_TAB_DOWNLOAD = 'tab-download';

// List of menu items for both the main-menu and sub-menu in navigation bar
const MENU_ITEMS = [ 
                     MENU_HOME, 
                     MENU_EDUCATION, 
                     MENU_WORK, 
                     MENU_PROJECTS, 
                     MENU_CONTACT, 
                     MENU_RESUME 
                   ];

// Determines if menu-item should go to a different page or download a file in
// a new tab
const menuItemType = new Map();
menuItemType.set(MENU_HOME,      MENU_TYPE_PAGE);
menuItemType.set(MENU_EDUCATION, MENU_TYPE_PAGE);
menuItemType.set(MENU_WORK,      MENU_TYPE_PAGE);
menuItemType.set(MENU_PROJECTS,  MENU_TYPE_PAGE);
menuItemType.set(MENU_CONTACT,   MENU_TYPE_PAGE);
menuItemType.set(MENU_RESUME,    MENU_TYPE_TAB_DOWNLOAD);

// Sub-menu item ID
const subMenuItemID = new Map();
subMenuItemID.set(MENU_HOME,      'sm_0');
subMenuItemID.set(MENU_EDUCATION, 'sm_1');
subMenuItemID.set(MENU_WORK,      'sm_2');
subMenuItemID.set(MENU_PROJECTS,  'sm_3');
subMenuItemID.set(MENU_CONTACT,   'sm_4');
subMenuItemID.set(MENU_RESUME,    'sm_5');

// Sub-menu text ID
const subMenuItemTextID = new Map();
subMenuItemTextID.set(MENU_HOME,      'smt_0');
subMenuItemTextID.set(MENU_EDUCATION, 'smt_1');
subMenuItemTextID.set(MENU_WORK,      'smt_2');
subMenuItemTextID.set(MENU_PROJECTS,  'smt_3');
subMenuItemTextID.set(MENU_CONTACT,   'smt_4');
subMenuItemTextID.set(MENU_RESUME,    'smt_5');

// Sub-menu item Icon
const subMenuItemIcon = new Map();
subMenuItemIcon.set(MENU_HOME,      <HomeIcon/>);
subMenuItemIcon.set(MENU_EDUCATION, <EducationIcon/>);
subMenuItemIcon.set(MENU_WORK,      <WorkIcon/>);
subMenuItemIcon.set(MENU_PROJECTS,  <ProjectsIcon/>);
subMenuItemIcon.set(MENU_CONTACT,   <ContactIcon/>);
subMenuItemIcon.set(MENU_RESUME,    <DownloadIcon/>);

// Main-menu text ID
const mainMenuItemTextID = new Map();
mainMenuItemTextID.set(MENU_HOME,      'mmt_0');
mainMenuItemTextID.set(MENU_EDUCATION, 'mmt_1');
mainMenuItemTextID.set(MENU_WORK,      'mmt_2');
mainMenuItemTextID.set(MENU_PROJECTS,  'mmt_3');
mainMenuItemTextID.set(MENU_CONTACT,   'mmt_4');
mainMenuItemTextID.set(MENU_RESUME,    'mmt_5');

// Hyperlink references
const PAGE_HOME_ID = 'page_0';
const PAGE_EDUCATION_ID = "page_1";
const PAGE_WORK_ID = "page_2";
const PAGE_PROJECTS_ID = "page_3";
const PAGE_CONTACT_ID = "page_4";
const RESUME_LINK = `${process.env.REACT_APP_SERVER_URL}/downloads/resume.pdf`;

// Determines were the menu item should redirect to
const pageID = new Map();
pageID.set(MENU_HOME,      PAGE_HOME_ID);
pageID.set(MENU_EDUCATION, PAGE_EDUCATION_ID);
pageID.set(MENU_WORK,      PAGE_WORK_ID);
pageID.set(MENU_PROJECTS,  PAGE_PROJECTS_ID);
pageID.set(MENU_CONTACT,   PAGE_CONTACT_ID);
pageID.set(MENU_RESUME,    RESUME_LINK);

// ID for main-menu bar
const MENU_BAR_ID = 'menubar';

// ID of last sub-menu item (used to blur background)
const SUB_MENU_OVERLAY_ID = "sm_last"

// Name/text displayed in navigation bar
const MENU_BAR_NAME = 'LUIS LOVE';

// Maximum width (in pixels) before the window screen is considered to be in
// mobile view (as opposed to desktop view)
const MOBILE_WIDTH = 800;

// How far to move a sub-menu item (in pixels) when displaying the sub-menu
const SUB_MENU_TRANSITION_OFFSET = 40;


export { 
         MENU_HOME, 
         MENU_EDUCATION, 
         MENU_WORK, 
         MENU_PROJECTS, 
         MENU_CONTACT, 
         MENU_RESUME,
         MENU_TYPE_PAGE,
         MENU_TYPE_TAB_DOWNLOAD,
         MENU_ITEMS,
         menuItemType,
         subMenuItemID,
         subMenuItemTextID,
         subMenuItemIcon,
         mainMenuItemTextID,
         PAGE_HOME_ID,
         PAGE_EDUCATION_ID,
         PAGE_WORK_ID,
         PAGE_PROJECTS_ID,
         PAGE_CONTACT_ID,
         RESUME_LINK,
         pageID,
         MENU_BAR_ID,
         MENU_BAR_NAME,
         MOBILE_WIDTH,
         SUB_MENU_OVERLAY_ID,
         SUB_MENU_TRANSITION_OFFSET
       }
