import React from 'react';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './navBar.scss';

const Navbar = () => {
    return (
        <nav className='stickyNav'>
            <div className='navContentWrapper'>
                <div className='mainLinks'>
                    <a href="#aboutMe">About Me</a>
                    <a href="#funProjects">Projects</a>
                </div>
                <div className="mediaLinks">
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
            </div>
            
        </nav>)
}

export default Navbar;