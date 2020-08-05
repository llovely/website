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
import ErrorPage from './components/pages/404-page/404Page';
import { Route, Switch, BrowserRouter } from 'react-router-dom';


// Constructs the website
function Website() {
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


export default function App() {  
  return (
    <BrowserRouter>
      <Switch>
        {/* Website */}
        <Route exact path='/' component={Website}/>
        
        {/* 404 Error Page for all other routes */}
        <Route path="*" component={ErrorPage}/>
      </Switch>
    </BrowserRouter>
  );
}
