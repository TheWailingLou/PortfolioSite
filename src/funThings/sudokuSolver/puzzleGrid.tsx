import React, { useState } from 'react';
import { ISudokuPuzzle, PuzzleCell, PuzzleRow } from './iSudokuPuzzle';

const PuzzleGrid: React.FC<{
    editable: boolean,
    puzzle: ISudokuPuzzle
    showPencil: boolean,
    editCell: (newValue: number | null, row: number, col: number) => void,
}> = ({
    editable,
    puzzle,
    showPencil,
    editCell,
}) => {
    const renderAllowed = (cell: PuzzleCell) => {
        if (!showPencil) {
            return (<></>)
        }

        const penciled = cell.allowed.map((allowed) => (
        <div className='penciledSudokuOption' key={`cell-${cell.row}-${cell.col}-allowed-${allowed}`}>
            {allowed}
        </div>))
        let excess = 0;
        while (penciled.length < 7) {
            penciled.push(<div className='penciledSudokuOption' key={`cell-${cell.row}-${cell.col}-excess-${excess}`}/>)
            excess += 1;
        }

        return penciled;
    }

    const [cellSelection, setCellSelection] = useState<[number, number] | null>(null);

    const handleCellClick = (row: number, col: number) => {
        if (!editable) {
            return;
        }

        setCellSelection([row, col]);
    }

    const changeCellValue = (e: React.ChangeEvent<HTMLInputElement>, row: number, col: number) => {
        const val = parseInt(e.target.value, 10);
        if (val > 0 && val < 10) {
            editCell(val, row, col);
        } else {
            editCell(null, row, col);
        }
    }
        

    const renderCell = (cell: PuzzleCell, rowNumber: number, cellNumber: number) => {
        if (cellSelection !== null) {
            if (cellSelection[0] === rowNumber && cellSelection[1] === cellNumber) {
                return (<input 
                    autoFocus
                    key={`inputcell-${rowNumber}-${cellNumber}`}
                    className={`sudokuCell editableCell`} 
                    type="number"
                    min={1}
                    max={9}
                    tabIndex={0}
                    onChange={(e) => changeCellValue(e, rowNumber, cellNumber)}
                    onBlur={() => setCellSelection(null)}
                    value={cell.confirmed || ""}>
                </input>)
            }
        }
        return (<div 
            className={`sudokuCell${cell.confirmed ? " confirmed" : ""}`} 
            onClick={() => handleCellClick(rowNumber, cellNumber)} 
            key={`cell-${rowNumber}-${cellNumber}`}
        >
            {cell.confirmed || renderAllowed(cell)}
        </div>)
    }


    const renderRow = (row: PuzzleRow, rowNumber: number) => (
        <div className='sudokuRow' key={`sudoku-row-${rowNumber}`}>
            {row.map((cell, cellNumber) => renderCell(cell, rowNumber, cellNumber))}
        </div>
    )

    return (<div className='puzzleGrid'>
        {puzzle.map(renderRow)}
    </div>)
}

export default PuzzleGrid;