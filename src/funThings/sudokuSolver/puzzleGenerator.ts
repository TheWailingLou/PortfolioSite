import { v4 } from "uuid";
import { ISudokuPuzzle, PuzzleCell, PuzzleRow } from "./iSudokuPuzzle";

const generateEmpty = () => {
    const puzzle: ISudokuPuzzle = [];
    for (let i=0; i<9; i++) {
        const newRow: PuzzleRow = [];
        for (let j=0; j<9; j++) {
            const cell: PuzzleCell = {
                confirmed: null,
                confirmedPencil: null,
                row: i,
                col: j,
                id: v4(),
                allowed: [1, 2, 3, 4, 5, 6, 7, 8, 9]
            }
            newRow.push(cell);
        }
        puzzle.push(newRow);
    }

    return puzzle;
}

export default generateEmpty;