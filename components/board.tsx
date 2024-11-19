"use client"
import React, {useEffect, useState} from "react";
import {Cell, createBoard} from "@/utils/createBoard";

interface BoardProps {
    rows: number;
    cols: number;
    mines: number;
}

const Board = ({ rows, cols, mines }: BoardProps) => {
    const [board, setBoard] = useState<Cell[][]>(() => createBoard(rows, cols, mines));
    const [gameStatus, setGameStatus] = useState<"playing" | "win" | "lost">("playing");
    const [remainingMines, setRemainingMines] = useState<number>(mines);

    useEffect(() => {
        const unrevealedCells = board.flatMap(row => row.filter(cell => !cell.isRevealed));

        if (unrevealedCells.length > 0 &&
            unrevealedCells.every(cell => cell.isMine) && gameStatus === "playing") {

            const newBoard = board.map(row => row.map(cell => {
                if (!cell.isRevealed && cell.isMine) {
                    return {...cell, isFlagged: true, isRevealed: true};
                }
                return cell;
            }));

            setBoard(newBoard);
            setGameStatus("win");
        }

        if (gameStatus === "playing" && checkWin(board)) {
            setGameStatus("win");
        }

        const flaggedMines = board.flatMap(row => row.filter(cell => cell.isFlagged && cell.isMine)).length;
        setRemainingMines(mines - flaggedMines);
    }, [board, gameStatus]);

    const revealCell = (row: number, col: number) => {
        if (board[row][col].isRevealed || board[row][col].isFlagged) return;

        const newBoard = [...board];

        if (newBoard[row][col].isMine) {
            setGameStatus("lost");
            newBoard.forEach((r) =>
                r.forEach((cell) => {
                    cell.isRevealed = true;
                })
            );
            setBoard(newBoard);
            return;
        }

        newBoard[row][col].isRevealed = true;

        if (newBoard[row][col].adjacentMines === 0 && !newBoard[row][col].isMine) {
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

    const checkWin = (currentBoard: Cell[][]) => {
        return currentBoard.every((row) =>
            row.every(
                (cell) =>
                    (cell.isRevealed && !cell.isMine) ||
                    (cell.isFlagged && cell.isMine)
            )
        );
    };


    return (
        <>
            <div style={{ marginBottom: "10px", textAlign: "center" }}>
                {gameStatus === "win" && <div style={{ color: "green", fontWeight: "bold" }}>🎉 You win!</div>}
                {gameStatus === "lost" && <div style={{ color: "red", fontWeight: "bold" }}>💣 You lost!</div>}
                {gameStatus === "playing" && <div style={{ fontWeight: "bold" }}>Keep playing!</div>}
            </div>
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
        </>
    );
};

export default Board;
