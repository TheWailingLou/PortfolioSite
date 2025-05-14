import React, { useEffect, useRef, useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDoubleDown, faEnvelope, faQuestion } from '@fortawesome/free-solid-svg-icons'
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import headshotThinking from './assets/headshotThinking.png';
import headshotNormal from './assets/headshotNormal.png';
import thoughtBubble from './assets/thoughtBubble.png'
import './mainContent.scss';
import SudokuSolver from '../funThings/sudokuSolver/sudokuSolver';
import AlienCalculator from '../funThings/alienCalculator/alienCalculator';
import Tooltip from '../components/tooltip';




const MainContent = () => {
    const possibleThoughts = [
        'API Integration',
        'Code Maintainablilty',
        'Performance Improvements',
        'Music',
        'Website Design',
        'Component Reusability',
        'National Parks',
        'SOLID Design Principles',
        'Logging',
        'Unit Tests',
        'UPDATE tablename WHERE...',
        'I wonder what Riley is up to.',
        'AI',
        'Agile',
        'Single Responsibility',
        'What should I name this interface?',
        'Dependency injection',
        'Make it work, make it right, make it fast.',
        'Debugging...',
        'Can this be automated?',
        'Pasta is better on a plate than a computer.'
    ]

    useEffect(() => {
        const thoughtInterval = setInterval(() => {
            const nextThoughtIndex = Math.floor(Math.random() * possibleThoughts.length); 
            setCurrentThought(possibleThoughts[nextThoughtIndex])
        }, 1200);

        return () => clearInterval(thoughtInterval);
    }, [])

    const [currentThought, setCurrentThought] = useState(possibleThoughts[0]);

    const [displayThoughtBubble, setDisplayThoughtBubble] = useState(false);

    return (<div className='mainContentWrapper' id="#aboutMe">
        <div className='stickyNav'>
            <div className='mainLinks'>
                <a href="#aboutMe">About Me</a>
                <a href="#funProjects">Projects</a>
            </div>
            <div className="mediaLinks">
                <a className='contact' target='blank' href='mailto:louis.antweiler@gmail.com?subject=Awesome Portfolio Site!'> 
                        <FontAwesomeIcon icon={faEnvelope} />
                </a> 
                <a className='contact' target='blank' href='https://www.linkedin.com/in/louis-antweiler/'> 
                    <FontAwesomeIcon icon={faLinkedin} />
                </a> 
                <a className='contact' target='blank' href='https://github.com/TheWailingLou'> 
                    <FontAwesomeIcon icon={faGithub} />
                </a> 
            </div>
        </div>
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
                <div className='aboutMe'>
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
                    <a className='contact' target='blank' href='mailto:louis.antweiler@gmail.com?subject=Awesome Portfolio Site!'> 
                        <FontAwesomeIcon icon={faEnvelope} />
                    </a> 
                    <a className='contact' target='blank' href='https://www.linkedin.com/in/louis-antweiler/'> 
                        <FontAwesomeIcon icon={faLinkedin} />
                    </a> 
                    <a className='contact' target='blank' href='https://github.com/TheWailingLou'> 
                        <FontAwesomeIcon icon={faGithub} />
                    </a> 
                </div>
                <div className='downloadButtonWrapper'>
                    <a className='downloadButton' href={'https://s3.us-east-1.amazonaws.com/builtbylouis.com/Resume-4-8-2025.pdf'} target='blank'> 
                        <span>Download CV</span> <span className='faIcon'><FontAwesomeIcon icon={faAngleDoubleDown} /> </span>
                    </a>
                </div>
                
            </div>
        </div>
        <div id="funProjects" className='Other'>
            <div className='funProjectHeader'>
                <h1> 
                    Fun Projects 
                </h1>
                <Tooltip  content={<div className='funProjectToolTip'>
                    <div>These are some fun projects I've built in my spare time.</div> 
                    <div>P.S. whenever you see the <FontAwesomeIcon icon={faQuestion}/> icon, you can click it to make the helper text not disappear when your mouse exits!</div>
                    <div>Simply click the <FontAwesomeIcon icon={faQuestion}/> again to return the helper text to hover functionality</div>
                </div>}/>
            </div>
            <div>
                <SudokuSolver />
            </div>
            <div>
                <AlienCalculator />
            </div>
        </div>
    </div>)
}

export default MainContent;