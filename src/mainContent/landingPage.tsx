import React, { useEffect, useState } from 'react';
import headshotThinking from '../assets/headshotThinking.png';
import headshotNormal from '../assets/headshotNormal.png';
import thoughtBubble from '../assets/thoughtBubble.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDoubleDown, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import thoughtList from './thoughtList';

import './landingPage.scss';

const LandingPage = () => {
    useEffect(() => {
        const thoughtInterval = setInterval(() => {
            const nextThoughtIndex = Math.floor(Math.random() * thoughtList.length); 
            setCurrentThought(thoughtList[nextThoughtIndex])
        }, 1200);

        return () => clearInterval(thoughtInterval);
    }, [])

    const [currentThought, setCurrentThought] = useState(thoughtList[0]);

    const [displayThoughtBubble, setDisplayThoughtBubble] = useState(false);
    return (        
        <div className='mainContent'>
            <div className='colorshift'>
                <div className='colorshiftTop' />
                <div className='colorshiftBottom' />
            </div>
            <div className='introduction' >
                <div className='thoughtBubbleWrapper'>
                    <div className='thoughtBubble' style={{backgroundImage: `url('${thoughtBubble}')`, opacity: displayThoughtBubble ? 1 : 0}}>
                        {currentThought}
                    </div>
                    
                </div>
                <div className='headshotWrapper'>
                    <img 
                        src={displayThoughtBubble ? headshotThinking : headshotNormal} className='headshot'
                        onMouseEnter={() => setDisplayThoughtBubble(true)}
                        onMouseLeave={() => setDisplayThoughtBubble(false)}
                    />
                </div>
                <div className='introductionGreeting'>
                    <div className='greeting'>Hello,</div> 
                    <div>I'm <span>Louis Antweiler</span>,</div> 
                    <div>a <span>fullstack</span> software engineer.</div>
                    <div>Right now, I'm <span
                        className='thinkingWord'
                        onMouseEnter={() => setDisplayThoughtBubble(true)}
                        onMouseLeave={() => setDisplayThoughtBubble(false)}
                    >thinking</span> about</div>
                    <div>how to build your <a href='mailto:louis.antweiler@gmail.com?subject=I have a website I was hoping you could build&body=Hey Louis! I found you via your website. I was wondering if we could chat about a website I want built. Sincerely,'className='websiteWord'>website.</a></div>
                    <a 
                        className='otherThoughts'
                        onMouseEnter={() => setDisplayThoughtBubble(true)}
                        onMouseLeave={() => setDisplayThoughtBubble(false)}
                        href={'#funProjects'}
                    >
                        And a few of <span>other things...</span>
                    </a>
                </div>
            </div>
            <div className='callToAction'>
                <div className='underPicture'>
                    <a className='contactIcon' target='blank' href='mailto:louis.antweiler@gmail.com?subject=Awesome Portfolio Site!'> 
                        <FontAwesomeIcon icon={faEnvelope} />
                    </a> 
                    <a className='contactIcon' target='blank' href='https://www.linkedin.com/in/louis-antweiler/'> 
                        <FontAwesomeIcon icon={faLinkedin} />
                    </a> 
                    <a className='contactIcon' target='blank' href='https://github.com/TheWailingLou'> 
                        <FontAwesomeIcon icon={faGithub} />
                    </a> 
                </div>
                <div className='downloadButtonWrapper'>
                    <a className='downloadButton' href={'https://s3.us-east-1.amazonaws.com/builtbylouis.com/Resume-4-8-2025.pdf'} target='blank'> 
                        <span>Download CV</span> <span className='faIcon'><FontAwesomeIcon icon={faAngleDoubleDown} /> </span>
                    </a>
                </div>
                
            </div>
        </div>)
}

export default LandingPage;