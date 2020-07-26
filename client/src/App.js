import React from 'react';

import Navigation from './components/navigation/Navigation';
import SomeRandomText from './components/SomeRandomText';

// Menu Icons (for Mobile)
import { PAGE_HOME_ID,
         PAGE_EDUCATION_ID,
         PAGE_WORK_ID,
         PAGE_PROJECTS_ID,
         PAGE_CONTACT_ID } from './components/constants/Constants';

function App() {  
  return (
    <div>
      <Navigation/>
      <div>
        <SomeRandomText color='var(--bg-color-1)' id={PAGE_HOME_ID} />
        <SomeRandomText color='var(--bg-color-2)'   id={PAGE_EDUCATION_ID} />
        <SomeRandomText color='var(--bg-color-1)' id={PAGE_WORK_ID} />
        <SomeRandomText color='var(--bg-color-2)'    id={PAGE_PROJECTS_ID} />
        <SomeRandomText color='var(--bg-color-1)'   id={PAGE_CONTACT_ID} />
      </div>
    </div>
  );
}


export default App;
