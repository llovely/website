import React from 'react';
import PageContainer from '../PageContainer';
import { PAGE_CONTACT_ID } from '../../constants/Constants';


export default function ProjectsPage(props) {

  const githubURL = process.env.REACT_APP_GITHUB;

  return (
    <div id={props.id}>
      <PageContainer pageStyle='pp-background'>
        <div className='page-container pp-container'>
          <div className='page-row'>
              <h2 className='page-header pp-header'>
                PROJECTS
                <hr className='page-header-hr pp-header-hr'/>
              </h2>
          </div>

          <div className='page-row'>
            <p className='page-message pp-message'>
              Have a look at my GitHub page: <a href={githubURL}
                                                target='_blank'
                                                rel='noopener noreferrer'
                                                className='pp-message-uni'>
                                               llovely 
                                             </a>
            </p>
          </div>

          <div className='page-row'>
            <a href={`#${PAGE_CONTACT_ID}`} className='page-button'>
              LETS GET CONNECTED!
            </a>
          </div>
        </div>
      </PageContainer>
    </div>
  );
}