import { createBoard } from '../utils/createBoard'

describe('createBoard', () => {
    it('should create a board with the correct number of rows and columns', () => {
        const rows = 5;
        const cols = 5;
        const board = createBoard(rows, cols, 0);

        expect(board.length).toBe(rows);
        expect(board[0].length).toBe(cols);
    });

    it('should place the correct number of mines', () => {
        const rows = 5;
        const cols = 5;
        const mines = 5;
        const board = createBoard(rows, cols, mines);

        let mineCount = 0;
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                if (board[row][col].isMine) {
                    mineCount++;
                }
            }
        }

        expect(mineCount).toBe(mines);
    });

    it('should not place mines in the same spot', () => {
        const rows = 5;
        const cols = 5;
        const mines = 5;
        const board = createBoard(rows, cols, mines);

        const minePositions = new Set<string>();
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                if (board[row][col].isMine) {
                    const pos = `${row},${col}`;
                    expect(minePositions.has(pos)).toBe(false);
                    minePositions.add(pos);
                }
            }
        }
    });
});
