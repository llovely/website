/*
 * EducationPage.js 
 *
 * This constructs the education & skills page of the website.
 * 
 * Author: Luis Love 
*/

import React from 'react';
import PageContainer from '../PageContainer';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import { PAGE_EDUCATION_ID, PAGE_WORK_ID } from '../../constants/Constants';
import { ReactComponent as DegreeIcon } from '../../../icons/degree.svg';
import { ReactComponent as GraduationIcon } from '../../../icons/education.svg';
import { ReactComponent as LanguagesIcon } from '../../../icons/coding.svg';
import { ReactComponent as SkillsIcon } from '../../../icons/skills.svg';
import '../pages.css';
import './education-page.css';


export default function EducationPage() {
  return (
    <div id={PAGE_EDUCATION_ID}>
      <PageContainer backgroundColor='var(--bg-color-2)'>
        <div className='page-row'>
          <h2 className='page-header'>
            EDUCATION & SKILLS
            <hr className='page-header-hr'/>
          </h2>
        </div>

        <div className='page-row'>
          <p className='page-message'>
            My alma mater is the <a href='https://www.uic.edu/'
                                    target='_blank'
                                    rel='noopener noreferrer'
                                    className='ep-message-uni'>
                                      University of Illinois at Chicago
                                  </a> (UIC).
          </p>
        </div>

        <div className='page-row'>
          <div className='page-item-container-quad'>
            <div className='ep-item-icon'>
              <DegreeIcon/>
            </div>
            <div className='ep-item-header'>
              Degree
            </div>
            <div className='ep-item-message'>
              Bachelor of Science in Computer Science, <span style={{'font-style': 'italic'}}>summa cum laude</span>
            </div>
          </div>

          <div className='page-item-container-quad'>
            <div className='ep-item-icon'>
              <GraduationIcon/>
            </div>
            <div className='ep-item-header'>
              Graduation
            </div>
            <div className='ep-item-message'>
              December 2019
            </div>
          </div>

          <div className='page-item-container-quad'>
            <div className='ep-item-icon'>
              <LanguagesIcon/>
            </div>
            <div className='ep-item-header'>
              Languages
            </div>
            <div className='ep-item-message'>
              Python, Scala, Java, C/C++, OCaml, SQL, Dart, JavaScript
            </div>
          </div>

          <div className='page-item-container-quad'>
            <div className='ep-item-icon'>
              <SkillsIcon/>
            </div>
            <div className='ep-item-header'>
              Skills
            </div>
            <div className='ep-item-message'>
              Git, x86 Assembly, MySQL, Bash Scripting, Docker, Flutter, React.js
            </div>
          </div>
        </div>

        <div className='page-row'>
          <AnchorLink href={`#${PAGE_WORK_ID}`} className='page-button'>
            WHERE HAVE I WORKED?
          </AnchorLink>
        </div>
      </PageContainer>
    </div>
  );
}
