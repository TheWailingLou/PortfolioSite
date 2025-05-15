import React from 'react';
import SectionHeader from '../components/sectionHeader';
import meImg from '../assets/image.png';
import './aboutMe.scss';

const AboutMe = () => {
    return (<div> 
        <SectionHeader 
            sectionTitle='About Me'
            linkId='aboutMe'
        />
        <div className='aboutMeContent'>
            <div className='spacingBox'>
                <div className='imageBoxWrapper'>
                    <div className='contactInfo'>
                        <h3>Contact Info</h3>
                        <div>Name: <span>(Foster) Louis Antweiler</span></div>
                        <div>Email: <span>Louis.Antweiler@gmail.com</span></div>
                        <div>Phone: <span>+1 303 519 9782</span></div>
                        <div>Location: <span>Broomfield, Colorado</span></div>
                    </div>
                    <div className='imBackground'>
                        <img src={meImg} />
                    </div>
                </div>
            </div>
            
            <div className='aboutMeBlurb'>
                <p>
                    Hello, I'm Louis Antweiler. I'm a fullstack software engineer that loves to take apart complex problems and build imaginative solutions. I've worked on healthcare scheduling platforms, GIS solutions for wildfire claims, content management for tech articles, and a variety of other things. I'm passionate about clean, extensible code, and solutions that not only work, but are easy to maintain and build on top of.     
                </p>
                <p>
                    In my spare time, I tinker in Unity, work on <a href='#funProjects'>small projects</a>, and play music. I also love to hike, spend time with my partner Riley, and travel (my most recent excursion was a trip to India).
                </p>
            </div>
            <div className='aboutMeFacts'>
                <ul className='skills'>
                    <h3>Technical Skills</h3>
                    <li>React</li>
                    <li>TypeScript</li>
                    <li>Node.js</li>
                    <li>C#</li>
                    <li>Java</li>
                    <li>Git</li>
                    <li>SQL</li>
                    <li>Webpack/Babel</li>
                    <li>REST</li>
                    <li>GraphQL</li>
                    <li>Unity</li>
                </ul>
                <ul className='methodology'>
                    <h3>Methodology</h3>
                    <li>Agile</li>
                    <li>SOLID Design</li>
                    <li>CI/CD</li>
                </ul>
                <ul className='methodology'>
                    <h3>Cloud</h3>
                    <li>AWS</li>
                    <li>Azure</li>
                </ul>
            </div>
        </div>
    </div>)
}

export default AboutMe;