import React from 'react';
import Navbar from './mainContent/navBar';
import LandingPage from './mainContent/landingPage';
import AboutMe from './mainContent/aboutMe';
import ProjectShowcase from './funThings/projectShowcase';

import './App.scss';


const App = () => {
    return (
        <div className={'appWrapper'} >
            <Navbar />
            <div className='contentWrapper'>
                <LandingPage />
                <AboutMe />
                <ProjectShowcase />
            </div>
        </div>
    )
}

export default App;