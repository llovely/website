import React from 'react';
import PageContainer from '../PageContainer';
import { PAGE_WORK_ID } from '../../constants/Constants';

export default function EducationPage(props) {
  return (
    <div id={props.id}>
      <PageContainer pageStyle='ep-background'>
        <div className='page-container ep-container'>
          <div className='page-row'>
              <h2 className='page-header ep-header'>
                EDUCATION & SKILLS
                <hr className='page-header-hr ep-header-hr'/>
              </h2>
          </div>

          <div className='page-row'>
            <p className='page-message ep-message'>
              My alma mater is the <a href='https://www.uic.edu/'
                                      target='_blank'
                                      rel='noopener noreferrer'
                                      className='ep-message-uni'>
                                        University of Illinois at Chicago
                                   </a> (UIC).
            </p>
          </div>

          <div className='page-row'>
            <a href={`#${PAGE_WORK_ID}`} className='page-button'>
              WHERE HAVE I WORKED?
            </a>
          </div>
        </div>
      </PageContainer>
    </div>
  );
}