export type PuzzleCell = {
    confirmed: number | null;
    confirmedPencil: number | null;
    allowed: number[];
    row: number;
    col: number;
    id: string;
}

export type PuzzleRow = PuzzleCell[];

export type ISudokuPuzzle = PuzzleRow[];