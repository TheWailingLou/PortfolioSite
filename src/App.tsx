import React from 'react';

import SudokuSolver from './funThings/sudokuSolver/sudokuSolver';


import './App.css';
import AlienCalculator from './funThings/alienCalculator/alienCalculator';
import MainContent from './mainContent/mainContent';


const App = () => {
    return (
        <div className={'appWrapper'} >
            {/* <SudokuSolver /> */}
            {/* <AlienCalculator /> */}
            <MainContent />
        </div>
    )
}

export default App;