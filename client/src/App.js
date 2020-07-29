import React from 'react';

import Navigation from './components/navigation/Navigation';
import HomePage from './components/pages/home-page/HomePage';
import EducationPage from './components/pages/education-page/EducationPage';
import WorkPage from './components/pages/work-page/WorkPage';
import ProjectsPage from './components/pages/projects-page/ProjectsPage';
import ContactPage from './components/pages/contact-page/ContactPage';

// Menu Icons (for Mobile)
import { PAGE_HOME_ID,
         PAGE_EDUCATION_ID,
         PAGE_WORK_ID,
         PAGE_PROJECTS_ID,
         PAGE_CONTACT_ID } from './components/constants/Constants';

function App() {  
  return (
    <div>
      <Navigation>
        <HomePage      id={PAGE_HOME_ID}/>
        <EducationPage id={PAGE_EDUCATION_ID}/>
        <WorkPage      id={PAGE_WORK_ID}/>
        <ProjectsPage  id={PAGE_PROJECTS_ID}/>
        <ContactPage   id={PAGE_CONTACT_ID}/>
      </Navigation>
    </div>
  );
}


export default App;
