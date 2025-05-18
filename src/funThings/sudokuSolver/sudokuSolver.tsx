import React, { useEffect, useState } from 'react';
import './sudokuSolver.scss';
import PuzzleGrid from './puzzleGrid';
import generateEmpty from './puzzleGenerator';
import { editCell, solvePuzzle, updateAutoPencil } from './sudokuSolverEngine';
import Tooltip from '../../components/tooltip';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDoubleDown, faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';
import SectionHeader from '../../components/sectionHeader';



const SudokuSolver = () => {
    // TODO change to reducer
    const [solvedPuzzle, setSolvedPuzzle] = useState(generateEmpty());

    const [puzzleEntry, setPuzzleEntry] = useState(generateEmpty());

    const [autoPencil, setAutoPencil] = useState(false);
    const [autoPencilLevel, setAutoPencilLevel] = useState(1);

    const updateCell = (newValue: number | null, row: number, col: number) => {
        
        const newSolvedPuzzle = editCell(solvedPuzzle, newValue, row, col); 
        setSolvedPuzzle(newSolvedPuzzle); 

        const updatedAutoPencil = updateAutoPencil(newSolvedPuzzle, autoPencilLevel);
        setPuzzleEntry(updatedAutoPencil);
    }

    useEffect(() => {
        const updatedAutoPencil = updateAutoPencil(solvedPuzzle, autoPencilLevel);
        setPuzzleEntry(updatedAutoPencil);
    }, [autoPencilLevel])

    const solvePuzzleWBruteForce = () => {
        const newPuzzle = solvePuzzle(solvedPuzzle); 
        
        setSolvedPuzzle(newPuzzle)
    }
    

    return (
        <div className='sudokuSolverWrapper'>
            <SectionHeader 
                isSubheader={true} 
                linkId='sudokuSolver'
                sectionTitle='Sudoku Solver'
                tooltipContent={<div className='tooltipText'>
                    This is a <a href='https://en.wikipedia.org/wiki/Sudoku' target='blank'>Sudoku</a> solver. Enter in the numbers on the left grid, and click solve to see the solution on the right!
                </div>}
            />
            {/* <div className='sudokuSolverHeaderWrapper'>
                <h2>Sudoku Solver</h2>
                <Tooltip content={<div className='tooltipText'>
                    This is a <a href='https://en.wikipedia.org/wiki/Sudoku' target='blank'>Sudoku</a> solver. Enter in the numbers on the left grid, and click solve to see the solution on the right!
                </div>} />
            </div> */}
            <div className={'sudokuSolver'} >
                <div className='autoPencilSelection'>
                    <div className='autoPencilSwitch'>
                        <input type='checkbox' checked={autoPencil} onChange={e => setAutoPencil(e.target.checked)}/>
                        <label>
                            Autopencil 
                        </label>
                        <Tooltip content={"Check this to automatically fill in possible values. Use the slider below to determine how sophisticated the autopencil is."} />
                    </div>
                    <div className='autoPencilControls'>
                        <div className='autoPencilSlider'>
                            <input 
                                type='range' 
                                min={1} 
                                max={3} 
                                value={autoPencilLevel} 
                                onChange={e => setAutoPencilLevel(parseInt(e.target.value, 10))}
                                className={autoPencil ? ' active' : ''}
                            />
                        </div>
                        <div className='autoPencilFillDescription'>
                            <div className={autoPencilLevel >= 1 && autoPencil ? 'active' : ''}>
                                Basic Elimination <Tooltip content={
                                    <div>At basic elimination, numbers are eliminated from pencil if there is the same number penned in the column, row, or square.</div>
                                }/>
                            </div>
                            <div className={autoPencilLevel >= 2 && autoPencil ? 'active' : ''}>
                                Single Number Rule <Tooltip content={
                                    <div>
                                        At single number rule, in addition to basic elimination, if a number is the only possible place it is allowed in its column, row, or square, all other numbers are eliminated.
                                    </div>
                                }/>
                            </div>
                            <div className={autoPencilLevel >= 3 && autoPencil ? 'active' : ''}>
                                Reapplication <Tooltip content={
                                    <div>
                                        At reapplication, basic elimination and single elimination are applied recursively until no numbers can be eliminated using these steps. 
                                        All puzzle solving beyond this point requires more advanced techniques (which I'll hopefully add later).
                                    </div>
                                }/>
                            </div>
                        </div>
                    </div>
                    <div/>
                </div>
                <PuzzleGrid editable={true} puzzle={puzzleEntry} showPencil={autoPencil} editCell={updateCell}/>
                <div className='solveButtonWrapper'>
                    <button onClick={() => {
                        solvePuzzleWBruteForce()
                    }}>
                        <FontAwesomeIcon icon={faAngleDoubleRight}/>
                        <div>Solve</div>
                        <FontAwesomeIcon icon={faAngleDoubleRight}/>
                    </button>
                </div>
                <div className='solveButtonWrapperVertical'>
                    <button onClick={() => {
                        solvePuzzleWBruteForce()
                    }}>
                        <FontAwesomeIcon icon={faAngleDoubleDown}/>
                        <div>Solve</div>
                        <FontAwesomeIcon icon={faAngleDoubleDown}/>
                    </button>
                </div>
                <PuzzleGrid editable={false} puzzle={solvedPuzzle} showPencil={false} editCell={updateCell}/>
                <div className='spacingBox'/>
            </div>
        </div>
        
    )
}

export default SudokuSolver;