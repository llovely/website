/*
 * ProjectsPage.js 
 *
 * This constructs the projects page of the website.
 * 
 * Author: Luis Love 
*/

import React from 'react';
import PageContainer from '../PageContainer';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import { PAGE_PROJECTS_ID, PAGE_CONTACT_ID } from '../../constants/Constants';
import '../pages.css';
import './projects-page.css';


export default function ProjectsPage() {

  // URL for my GitHub page
  const githubURL = process.env.REACT_APP_GITHUB;

  // List of projects
  const projects = [
    { title: 'luislove.dev',
      desc: 'View the source code for this website.',
      gihub_url: 'https://github.com/llovely/website',
      photo_url: `${process.env.REACT_APP_SERVER_URL}/images/website.png`
    },
    { title: 'dotfiles',
      desc: 'You ever get annoyed with manually installing software and packages, configuring your shell, on a new machine?',
      gihub_url: 'https://github.com/llovely/dotfiles',
      photo_url: `${process.env.REACT_APP_SERVER_URL}/images/terminal.png`
    }
  ];

  // Constructs project components based on above projects list
  const projectComponents = projects.map((x) => {
    return (
      <div className='page-item-container-duo'>
        <div className='pp-item-background' style={{'background-image': `url(${x.photo_url}`}}>
          <a href={x.gihub_url} target='_blank' rel='noopener noreferrer' className='pp-item-overlay'>
            <div className='pp-item-desc'>
              {x.desc}
            </div>
          </a>
          <div className='pp-item-title'>
            {x.title}
          </div>
        </div>
      </div>
    );
  });

  return (
    <div id={PAGE_PROJECTS_ID}>
      <PageContainer backgroundColor='var(--bg-color-2)'>
        <div className='page-row'>
          <h2 className='page-header'>
            PROJECTS
            <hr className='page-header-hr'/>
          </h2>
        </div>

        <div className='page-row'>
          <p className='page-message'>
            Have a look at my GitHub page: <a href={githubURL}
                                              target='_blank'
                                              rel='noopener noreferrer'
                                              className='pp-message-underline'>
                                              llovely 
                                            </a>
          </p>
        </div>

        <div className='page-row'>
          {projectComponents}
        </div>

        <div className='page-row'>
          <AnchorLink href={`#${PAGE_CONTACT_ID}`} className='page-button'>
            LETS GET CONNECTED!
          </AnchorLink>
        </div>
      </PageContainer>
    </div>
  );
}
