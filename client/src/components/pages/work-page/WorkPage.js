import React from 'react';
import PageContainer from '../PageContainer';
import { PAGE_PROJECTS_ID } from '../../constants/Constants';

import { ReactComponent as VmwareIcon } from '../../../icons/vmware.svg';
import { ReactComponent as UICIcon } from '../../../icons/uic.svg';

export default function WorkPage(props) {
  return (
    <div id={props.id}>
      <PageContainer pageStyle='wp-background'>
        <div className='page-container wp-container'>
          <div className='page-row'>
              <h2 className='page-header wp-header'>
                WORK
                <hr className='page-header-hr wp-header-hr'/>
              </h2>
          </div>

          <div className='page-row'>
            <p className='page-message wp-message'>
              I'm a recent graduate seeking full-time employment as a SWE.
            </p>
          </div>

          <div className='page-row'>
            <div className='wp-item-container'>
              <div className='wp-item-icon'>
                <VmwareIcon/>
              </div>
              <div className='wp-item-header'>
                Intern - Performance
              </div>
              <a href='https://www.vmware.com/'
                 target='_blank'
                 rel='noopener noreferrer'
                 className='wp-employer-name'>
                  VMware
              </a>
              <div className='wp-item-message'>
                May 2018 - August 2018
              </div>
            </div>

            <div className='wp-item-container'>
              <div className='wp-item-icon'>
                <UICIcon/>
              </div>
              <div className='wp-item-header'>
                Undergradute Researcher
              </div>
              <a href='https://bits.lab.uic.edu/'
                 target='_blank'
                 rel='noopener noreferrer'
                 className='wp-employer-name'>BITS Networked Systems Lab at UIC
              </a>
              <div className='wp-item-message'>
                May 2019 - December 2019
              </div>
            </div>
          </div>

          <div className='page-row'>
            <a href={`#${PAGE_PROJECTS_ID}`} className='page-button'>
              WHAT HAVE I WORKED ON?
            </a>
          </div>
        </div>
      </PageContainer>
    </div>
  );
}