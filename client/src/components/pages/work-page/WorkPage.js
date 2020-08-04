/*
 * WorkPage.js 
 *
 * This constructs the work page of the website.
 * 
 * Author: Luis Love 
*/

import React from 'react';
import PageContainer from '../PageContainer';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import { PAGE_PROJECTS_ID, PAGE_WORK_ID } from '../../constants/Constants';
import { ReactComponent as VmwareIcon } from '../../../icons/vmware.svg';
import { ReactComponent as UICIcon } from '../../../icons/uic.svg';
import '../pages.css';
import './work-page.css';


export default function WorkPage() {
  return (
    <div id={PAGE_WORK_ID}>
      <PageContainer backgroundColor='var(--bg-color-1)'>
        <div className='page-row'>
          <h2 className='page-header'>
            WORK
            <hr className='page-header-hr'/>
          </h2>
        </div>

        <div className='page-row'>
          <p className='page-message'>
            I'm a recent graduate seeking full-time employment as a SWE.
          </p>
        </div>

        <div className='page-row'>
          <div className='page-item-container-duo'>
            <div className='wp-item-icon'>
              <VmwareIcon/>
            </div>
            <div className='wp-item-header'>
              Intern - Performance
            </div>
            <a href='https://www.vmware.com/'
               target='_blank'
               rel='noopener noreferrer'
               className='wp-employer-name'
              >
              VMware
            </a>
            <div className='wp-item-message'>
              May 2018 - August 2018
            </div>
          </div>

          <div className='page-item-container-duo'>
            <div className='wp-item-icon'>
              <UICIcon/>
            </div>
            <div className='wp-item-header'>
              Undergradute Researcher
            </div>
            <a href='https://bits.lab.uic.edu/'
               target='_blank'
               rel='noopener noreferrer'
               className='wp-employer-name'
              >
              BITS Networked Systems Lab at UIC
            </a>
            <div className='wp-item-message'>
              May 2019 - December 2019
            </div>
          </div>
        </div>

        <div className='page-row'>
          <AnchorLink href={`#${PAGE_PROJECTS_ID}`} className='page-button'>
            WHAT HAVE I WORKED ON?
          </AnchorLink>
        </div>
      </PageContainer>
    </div>
  );
}
