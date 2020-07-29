import React from 'react';
import PageContainer from '../PageContainer';
import { PAGE_PROJECTS_ID } from '../../constants/Constants';

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
            <a href={`#${PAGE_PROJECTS_ID}`} className='page-button'>
              WHAT HAVE I WORKED ON?
            </a>
          </div>
        </div>
      </PageContainer>
    </div>
  );
}