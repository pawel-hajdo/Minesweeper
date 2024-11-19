"use client"
import React, { useState } from "react";
import { createBoard, Cell } from "@/utils/createBoard";

interface BoardProps {
    rows: number;
    cols: number;
    mines: number;
}

const Board = ({ rows, cols, mines }: BoardProps) => {
    const [board, setBoard] = useState<Cell[][]>(() => createBoard(rows, cols, mines));

    const revealCell = (row: number, col: number) => {
        if (board[row][col].isRevealed || board[row][col].isFlagged) return;

        const newBoard = [...board];
        newBoard[row][col].isRevealed = true;

        if (newBoard[row][col].adjacentMines === 0 && !newBoard[row][col].isMine) {
            // Odkrywamy sąsiednie pola (rekursywnie)
            const directions = [
                [-1, -1], [-1, 0], [-1, 1],
                [0, -1],          [0, 1],
                [1, -1], [1, 0], [1, 1],
            ];

            directions.forEach(([dx, dy]) => {
                const newRow = row + dx;
                const newCol = col + dy;
                if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols) {
                    revealCell(newRow, newCol);
                }
            });
        }

        setBoard(newBoard);
    };

    const toggleFlag = (row: number, col: number, event: React.MouseEvent) => {
        event.preventDefault();
        if (board[row][col].isRevealed) return;

        const newBoard = [...board];
        newBoard[row][col].isFlagged = !newBoard[row][col].isFlagged;
        setBoard(newBoard);
    };

    return (
        <div style={{ display: "grid", gridTemplateColumns: `repeat(${cols}, 30px)` }}>
            {board.map((row, rowIndex) =>
                row.map((cell, colIndex) => (
                    <div
                        key={`${rowIndex}-${colIndex}`}
                        style={{
                            width: 30,
                            height: 30,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            border: "1px solid #ccc",
                            backgroundColor: cell.isRevealed ? "#ddd" : "#999",
                            color: "black",
                            cursor: "pointer",
                        }}
                        onClick={() => revealCell(rowIndex, colIndex)}
                        onContextMenu={(e) => toggleFlag(rowIndex, colIndex, e)}
                    >
                        {cell.isFlagged && !cell.isRevealed && (
                            <span style={{ color: "red", fontWeight: "bold" }}>🚩</span>
                        )}
                        {cell.isRevealed && (cell.isMine ? "💣" : cell.adjacentMines || "")}
                    </div>
                ))
            )}
        </div>
    );
};

export default Board;
