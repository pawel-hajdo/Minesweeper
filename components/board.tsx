"use client"
import React, {useEffect, useState} from "react";
import {Cell, createBoard} from "@/utils/createBoard";
import {formatTime} from "@/lib/utils";

interface BoardProps {
    rows: number;
    cols: number;
    mines: number;
    onGameEnd?: (time: number, status: "win" | "lost") => void;
}

const Board = ({ rows, cols, mines, onGameEnd }: BoardProps) => {
    const [board, setBoard] = useState<Cell[][]>(() => createBoard(rows, cols, mines));
    const [gameStatus, setGameStatus] = useState<"playing" | "win" | "lost">("playing");
    const [time, setTime] = useState<number>(0);
    const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
    const [unusedFlags, setUnusedFlags] = useState<number>(mines);

    useEffect(() => {
        if (gameStatus !== "playing" && onGameEnd) {
            onGameEnd(time, gameStatus);
        }
    }, [gameStatus, time, onGameEnd]);

    useEffect(() => {
        let timerId: NodeJS.Timeout;
        if (isTimerRunning && gameStatus === "playing") {
            timerId = setInterval(() => {
                setTime(prevTime => prevTime + 1);
            }, 1000);
        }
        return () => clearInterval(timerId);
    }, [isTimerRunning, gameStatus]);

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
            setIsTimerRunning(false);
        }

        if (gameStatus === "playing" && checkWin(board)) {
            setGameStatus("win");
            setIsTimerRunning(false);
        }

    }, [board, gameStatus]);

    const revealCell = (row: number, col: number) => {
        // Start timer on first move
        if (!isTimerRunning) {
            setIsTimerRunning(true);
        }

        if (board[row][col].isRevealed || board[row][col].isFlagged) return;

        const newBoard = [...board];

        if (newBoard[row][col].isMine) {
            setGameStatus("lost");
            setIsTimerRunning(false);
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

        // Start timer on first flag
        if (!isTimerRunning) {
            setIsTimerRunning(true);
        }

        if (board[row][col].isRevealed) return;

        const newBoard = [...board];

        // If cell is not currently flagged and we have flags left
        if (!newBoard[row][col].isFlagged) {
            newBoard[row][col].isFlagged = true;
            setUnusedFlags(prev => prev - 1);
        }
        // If cell is currently flagged, remove the flag
        else if (newBoard[row][col].isFlagged) {
            newBoard[row][col].isFlagged = false;
            setUnusedFlags(prev => prev + 1);
        }

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

    const resetGame = () => {
        setBoard(createBoard(rows, cols, mines));
        setGameStatus("playing");
        setTime(0);
        setIsTimerRunning(false);
        setUnusedFlags(mines);
    };

    return (
        <>
            <div style={{
                marginBottom: "10px",
                textAlign: "center",
                display: "flex",
                justifyContent: "space-between",
                padding: "0 20px"
            }}>
                <div>🚩 Flags: {unusedFlags}</div>
                <div>⏱️ Time: {formatTime(time)}</div>
            </div>
            <div style={{ marginBottom: "10px", textAlign: "center" }}>
                {gameStatus === "win" && <div style={{ color: "green", fontWeight: "bold" }}>🎉 You win!</div>}
                {gameStatus === "lost" && <div style={{ color: "red", fontWeight: "bold" }}>💣 You lost!</div>}
                {gameStatus === "playing" && <div style={{ fontWeight: "bold" }}>Keep playing!</div>}
                <button
                    onClick={resetGame}
                    style={{
                        padding: "5px 10px",
                        backgroundColor: "#4CAF50",
                        color: "white",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer"
                    }}
                >
                    New Game
                </button>
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
