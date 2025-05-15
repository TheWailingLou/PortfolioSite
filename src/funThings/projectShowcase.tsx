import React from 'react';
import Tooltip from '../components/tooltip';
import SudokuSolver from './sudokuSolver/sudokuSolver';
import AlienCalculator from './alienCalculator/alienCalculator';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestion } from '@fortawesome/free-solid-svg-icons';

import './projectShowcase.scss';
import SectionHeader from '../components/sectionHeader';

const ProjectShowcase = () => {
    return (<div className='Other'>
        <SectionHeader 
            sectionTitle='Fun Projects'
            linkId='funProjects'
            tooltipContent={<div className='funProjectToolTip'>
                <div>These are some fun projects I've built in my spare time.</div> 
                <div>P.S. whenever you see the <FontAwesomeIcon icon={faQuestion}/> icon, you can click it to make the helper text not disappear when your mouse exits!</div>
                <div>Simply click the <FontAwesomeIcon icon={faQuestion}/> again to return the helper text to hover functionality</div>
            </div>}
        />
        <div>
            <SudokuSolver />
        </div>
        <div>
            <AlienCalculator />
        </div>
    </div>)
}

export default ProjectShowcase;