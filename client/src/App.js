/*
 * App.js 
 *
 * Constructs personal website.
 * 
 * Author: Luis Love 
*/

import React from 'react';
import Navigation from './components/navigation/Navigation';
import HomePage from './components/pages/home-page/HomePage';
import EducationPage from './components/pages/education-page/EducationPage';
import WorkPage from './components/pages/work-page/WorkPage';
import ProjectsPage from './components/pages/projects-page/ProjectsPage';
import ContactPage from './components/pages/contact-page/ContactPage';


export default function App() {  
  return (
    <div>
      {/* Due to the blur effect on the Homepage, the navigation bar is 
          placed below in order to not be covered by the blur. */}
      <HomePage/>
      <Navigation/>
      <EducationPage/>
      <WorkPage/>
      <ProjectsPage/>
      <ContactPage/>
    </div>
  );
}
