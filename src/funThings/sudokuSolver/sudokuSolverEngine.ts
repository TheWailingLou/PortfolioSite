import { cloneDeep } from "lodash";
import { ISudokuPuzzle, PuzzleCell, PuzzleRow } from "./iSudokuPuzzle";

type updateAllowed = (puzzle: ISudokuPuzzle, currentAllowed: number[],  cellRow: number, cellCol: number) => number[];

export const solvePuzzle = (puzzle: ISudokuPuzzle) => {
    let bruteForced = bruteForceMutation(puzzle);
    while (!isPuzzleSolved(bruteForced)) {
        bruteForced = bruteForceMutation(bruteForced);
    }
    bruteForced.forEach(row =>  row.forEach(cell => {
        cell.confirmed = cell.confirmedPencil;
    }))
    return bruteForced;
}

export const editCell = (puzzle: ISudokuPuzzle, newCellValue: number | null, row: number, col: number) => {
    
    const firstPass = firstPassMutation(puzzle, newCellValue, row, col, false);
    const secondPass = secondPassMutation(firstPass);
    let multiPass = thirdPassMutation(secondPass);
    let passes = 1;
    while (multiPass.changed !== 0) {
        passes += 1;
        multiPass = thirdPassMutation(multiPass.updated);  
    }
    return multiPass.updated;
}

export const updateAutoPencil = (puzzle: ISudokuPuzzle, autoPencilLevel: number) => {
    let newPuzzle = cloneDeep(puzzle);
    puzzle.forEach(row => row.forEach(cell => {
        newPuzzle[cell.row][cell.col] = {
            confirmed: cell.confirmed,
            confirmedPencil: cell.confirmed,
            id: cell.id,
            row: cell.row,
            col: cell.col,
            allowed: cell.confirmed ? [cell.confirmed] : [1, 2, 3, 4, 5, 6, 7, 8, 9]
        }  
    }))
    newPuzzle.forEach(row => row.forEach(cell => {
        if(!cell.confirmed) {
            newPuzzle[cell.row][cell.col] = {
                ...cell,
                allowed:  cell.confirmed ? [cell.confirmed] : getAllowedValues(newPuzzle, cell.row, cell.col, false)
            }
        }
    }))

    // console.log("AUTO PENCIL: ", autoPencilLevel)
    if (autoPencilLevel > 1) {
        newPuzzle = secondPassMutation(newPuzzle);
    }

    if (autoPencilLevel > 2) {
        let multiPass = thirdPassMutation(newPuzzle);
        while (multiPass.changed !== 0) {
            multiPass = thirdPassMutation(multiPass.updated);  
        }

        newPuzzle = multiPass.updated;
    }


    return newPuzzle;
}

const getAllowedValues = (puzzle: ISudokuPuzzle, row: number, col: number, reuseAllowed: boolean) => {
    
    let allowed = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    if (reuseAllowed) {
        allowed = cloneDeep(puzzle[row][col].allowed);
    }

    allowed = basicRowAllowedUpdate(puzzle, allowed, row, col);
    allowed = basicColAllowedUpdate(puzzle, allowed, row, col);
    allowed = basicSquareAllowedUpdate(puzzle, allowed, row, col);

    return allowed;
}

const getSquareForCell = (puzzle: ISudokuPuzzle, cellRow: number, cellCol: number, excludeCell: boolean) => {
    const square = [];

    const squareRow = Math.floor(cellRow / 3) * 3;
    const squareCol = Math.floor(cellCol / 3) * 3;

    for (let i=squareRow; i<squareRow +3; i++) {
        for(let j=squareCol; j<squareCol+3; j++) {
            const isCell = i === cellRow && j === cellCol;
            if (!isCell || !excludeCell) {
                square.push(puzzle[i][j])
            }
        }
    }

    return square;
}

const getRowForCell = (puzzle: ISudokuPuzzle, cellRow: number, cellCol: number, excludeCell: boolean) => {
    const row = [];


    for (let i=0; i<9; i++) {
        if (i != cellCol || !excludeCell) {
            row.push(puzzle[cellRow][i])
        }
        
    }

    return row;
}

const getColForCell = (puzzle: ISudokuPuzzle, cellRow: number, cellCol: number, excludeCell: boolean) => {
    const row = [];


    for (let i=0; i<9; i++) {
        if (i != cellRow || !excludeCell) {
            row.push(puzzle[i][cellCol])
        } 
    }

    return row;
}


const basicRowAllowedUpdate: updateAllowed = (puzzle, currentAllowed, cellRow, cellCol) => {
    return currentAllowed.filter(val => !puzzle[cellRow].find(cell => (cell.confirmed === val || cell.confirmedPencil === val)))
}

const basicColAllowedUpdate: updateAllowed = (puzzle, currentAllowed, cellRow, cellCol) => {
    return currentAllowed.filter(val => !puzzle.find(row => (row[cellCol].confirmed === val || row[cellCol].confirmedPencil === val)))
}

const basicSquareAllowedUpdate: updateAllowed = (puzzle, currentAllowed, cellRow, cellCol) => {
    const square = getSquareForCell(puzzle, cellRow, cellCol, false);
    return currentAllowed.filter(val => !square.find(cell => (cell.confirmed === val || cell.confirmedPencil === val)))
}

const firstPassMutation = (puzzle: ISudokuPuzzle, newCellValue: number | null, row: number, col: number, isPencil: boolean) => {
    const firstPass = cloneDeep(puzzle);

    firstPass[row][col] = {
        confirmed: isPencil ? null : newCellValue,
        confirmedPencil: newCellValue,
        allowed: newCellValue ? [newCellValue] : getAllowedValues(puzzle, row, col, true),
        id: firstPass[row][col].id,
        row,
        col,
    }

    const squareVals = getSquareForCell(puzzle, row, col, true);
    const rowVals = getRowForCell(puzzle, row, col, true);
    const colVals = getColForCell(puzzle, row, col, true);

    for (let i=0; i<8; i++) {
        const sqVal = squareVals[i];
        if (!sqVal.confirmed && !sqVal.confirmedPencil) {
            firstPass[sqVal.row][sqVal.col] = {
                confirmed: null,
                confirmedPencil: null,
                allowed: getAllowedValues(firstPass, sqVal.row, sqVal.col, true),
                id: sqVal.id,
                row: sqVal.row,
                col: sqVal.col,
            }
        }

        const rowVal = rowVals[i];
        if (!rowVal.confirmed && !rowVal.confirmedPencil) {
            firstPass[rowVal.row][rowVal.col] = {
                confirmed: null,
                confirmedPencil: null,
                allowed: getAllowedValues(firstPass, rowVal.row, rowVal.col, true),
                id: rowVal.id,
                row: rowVal.row,
                col: rowVal.col,
            }
        }

        const colVal = colVals[i];
        if (!colVal.confirmed && !colVal.confirmedPencil) {
            firstPass[colVal.row][colVal.col] = {
                confirmed: null,
                confirmedPencil: null,
                allowed: getAllowedValues(firstPass, colVal.row, colVal.col, true),
                id: colVal.id,
                row: colVal.row,
                col: colVal.col,
            }
        }
    }

    return firstPass;

}

const secondPassMutation = (puzzle: ISudokuPuzzle) => {
    const secondPass = cloneDeep(puzzle);

    puzzle.forEach(row => {
        row.forEach(cell => {
            if (!cell.confirmed && !cell.confirmedPencil) {
                let newAllowed = cell.allowed;
                newAllowed = singleInRowRule(secondPass, newAllowed, cell.row, cell.col);
                newAllowed = singleInColRule(secondPass, newAllowed, cell.row, cell.col);
                newAllowed = singleInSquareRule(secondPass, newAllowed, cell.row, cell.col);
                secondPass[cell.row][cell.col].allowed = newAllowed;
            }
        })
    })

    return secondPass;
}

const singleInRowRule: updateAllowed = (puzzle, currentAllowed, cellRow, cellCol) => {
    const onlyInRow = currentAllowed.find(val => !puzzle[cellRow].find(cell => cell.allowed.includes(val)))
    if(onlyInRow) {
        return [onlyInRow]
    }
    return currentAllowed;
}

const singleInColRule: updateAllowed = (puzzle, currentAllowed, cellRow, cellCol) => {
    const onlyInCol = currentAllowed.find(val => !puzzle.find(cell => cell[cellCol].allowed.includes(val)))
    if(onlyInCol) {
        return [onlyInCol]
    }
    return currentAllowed;
}

const singleInSquareRule: updateAllowed = (puzzle, currentAllowed, cellRow, cellCol) => {
    const sqVals = getSquareForCell(puzzle, cellRow, cellCol, true);
    const onlyInSq = currentAllowed.find(val => !sqVals.find(cell => cell.allowed.includes(val)))
    if(onlyInSq) {
        return [onlyInSq]
    }
    return currentAllowed;
}

const thirdPassMutation = (puzzle: ISudokuPuzzle) => {
    let thirdPass = cloneDeep(puzzle);

    let changed = 0;

    puzzle.forEach(row => {
        row.forEach(cell => {
            if (!cell.confirmed && !cell.confirmedPencil) {
                if (cell.allowed.length === 1) {
                    thirdPass = firstPassMutation(puzzle, cell.allowed[0], cell.row, cell.col, true);
                    changed += 1;
                }
            }
        })
    })

    const rePass = secondPassMutation(thirdPass);

    return {
        updated: rePass,
        changed,
    };

}

const bruteForceMutation = (puzzle: ISudokuPuzzle) => {
    let cellTarget = null;
    let row = 0;
    let col = 0;

    while (cellTarget === null && row < 9) {
        if (puzzle[row][col].allowed.length > 1) {
            cellTarget = puzzle[row][col];
        } else {
            if (col < 9) {
                col += 1;
            } else {
                col = 0;
                row += 1;
            }
        }
    }

    if (cellTarget === null) {
        return puzzle;
    }

    const attempt = cellTarget.allowed[0];
    const newPuzzle = firstPassMutation(puzzle, cellTarget.allowed[0], cellTarget.row, cellTarget.col, true);
    const nextPass = secondPassMutation(newPuzzle);
    let third = thirdPassMutation(nextPass);
    while (third.changed !== 0) {
        third = thirdPassMutation(third.updated)
    }

    if (checkValid(third.updated)) {
        return third.updated;
    } else {
        const updatedAllowed = cloneDeep(puzzle);
        updatedAllowed[cellTarget.row][cellTarget.col] = {
            ...cellTarget,
            allowed: cellTarget.allowed.filter(a => a != attempt)
        }
        return updatedAllowed;
    }

}

const squareGroupRule = (puzzle: ISudokuPuzzle, square: [number, number]) => {
    const squareVals = getSquareForCell(puzzle, square[0] * 3, square[1] * 3, false);
    const pairs = getPairsFromSquare(squareVals);
}

type GroupPair = {
    values: [number, number]
    cells: string[]
};
type ValueInfo = {
    value: number,
    cells: PuzzleCell[]
}

const getPairsFromSquare = (square: PuzzleRow) => {
    const remaining = [1, 2, 3, 4, 5, 6, 7, 8, 9].filter(val => !square.find(cell => cell.confirmed === val || cell.confirmedPencil === val));
    const byValue = remaining.map(value => ({
        value,
        cells: square.filter(cell => cell.allowed.includes(value)),
    })).sort((a, b) => a.cells.length - b.cells.length);

    // find pairs

    const pairs = byValue.filter(v => v.cells.length == 2).reduce((pairs: GroupPair[], value: ValueInfo) => {
        if (pairs.find(v => v.values.includes(value.value))) 
        {
            return pairs;
        }
        const cellIdsForValue = value.cells.map(c => c.id);
        const match = byValue.find(v => {
            const notCurrent = v.value !== value.value; 
            const exactMatch = v.cells.filter(c => !cellIdsForValue.includes(c.id)).length === 0;
            return notCurrent && exactMatch;  
        })
        
        if (match) {
            return [
                {
                    values: [match.value, value.value],
                    cells: match.cells.map(c => c.id),
                } as GroupPair,
                ...pairs
            ]
        }

        return pairs;
    }, []);

    return pairs;

}

// TODO:
const findInvalidCells = (section: PuzzleRow) => {
    return section.reduce((
        validity: { 
            checked: number[], 
            invalidCell: PuzzleCell | null 
        }, 
        cell: PuzzleCell
    ) => {
        if (validity.invalidCell) {
            return validity;
        }
        if (cell.confirmed || cell.confirmedPencil) {
        
            const confirmedInvalid = cell.confirmed && validity.checked.includes(cell.confirmed);
            const confirmedPencilInvalid =  cell.confirmedPencil && validity.checked.includes(cell.confirmedPencil);
            if (confirmedInvalid || confirmedPencilInvalid) {
                
                return {
                    ...validity,
                    invalidCell: cell
                }
            } else {
                return {
                    checked: [...validity.checked, cell.confirmed ? cell.confirmed : cell.confirmedPencil] as number[],
                    invalidCell: null
                }
            }
        } else  {
            if (cell.allowed.length === 0) {
                return {
                    ...validity,
                    invalidCell: cell
                }
            }

            return {
                ...validity
            }
        }
     }, { checked: [], invalidCell: null  })
}
// const checkSquare = () => {

// }
// const checkRow = () => {}
// const checkCol = () => {}

const checkValid = (puzzle: ISudokuPuzzle) => {
    for(let i=0; i<3;i++) {
        for (let j=0; j<3; j++) {
            const rowNum = i * 3 + j;
            const colNum = i * 3 + j;

            const row = getRowForCell(puzzle, rowNum, 0, false);
            const rowValid = findInvalidCells(row);
            if (rowValid.invalidCell) {
                return false;
            }
            const col = getColForCell(puzzle, 0, colNum, false);
            const colValid = findInvalidCells(col);
            if (colValid.invalidCell) {
                return false;
            }
            const sq = getSquareForCell(puzzle, rowNum, colNum, false);
            const sqValid = findInvalidCells(sq);
            if (sqValid.invalidCell) {
                return false;
            }
        }
    }

    return true;
}

const isPuzzleSolved = (puzzle: ISudokuPuzzle) => {
    return !puzzle.find(row => row.find(c => c.confirmed === null && c.confirmedPencil === null))
}