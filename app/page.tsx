"use client"
import React, { useState } from "react";
import Board from "@/components/board";
import {getUsername} from "@/lib/utils";

interface DifficultyLevel {
    name: string;
    rows: number;
    cols: number;
    mines: number;
}

const DIFFICULTY_LEVELS: DifficultyLevel[] = [
    { name: "Easy", rows: 9, cols: 9, mines: 10 },
    { name: "Medium", rows: 16, cols: 16, mines: 40 },
    { name: "Hard", rows: 16, cols: 30, mines: 99 }
];

export default function Home() {
    const [selectedLevel, setSelectedLevel] = useState<DifficultyLevel>(DIFFICULTY_LEVELS[0]);
    const [key, setKey] = useState<number>(0);

    const handleDifficultyChange = (level: DifficultyLevel) => {
        setSelectedLevel(level);
        // Force re-render of Board component
        setKey(prev => prev + 1);
    };

    const submitGameResult = async (time: number, status: "win" | "lost") => {
        if (status !== "win") return;

        try {
            const response = await fetch('/api/results', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: getUsername(),
                    time,
                    difficulty: selectedLevel.name.toLowerCase()
                })
            });

            if (!response.ok) {
                throw new Error('Failed to submit game result');
            }

            const result = await response.json();
            console.log('Game result submitted:', result);
        } catch (error) {
            console.error('Error submitting game result:', error);
        }
    };

    return (
        <div className="flex flex-col items-center mt-16">
            <div className="mb-6">
                <h1 className="text-2xl font-bold mb-4">Minesweeper</h1>
                <div className="flex space-x-4">
                    {DIFFICULTY_LEVELS.map((level) => (
                        <button
                            key={level.name}
                            onClick={() => handleDifficultyChange(level)}
                            className={`
                px-4 py-2 rounded transition-colors 
                ${selectedLevel.name === level.name
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-200 text-black hover:bg-blue-200'
                            }
              `}
                        >
                            {level.name}
                        </button>
                    ))}
                </div>
            </div>
            <Board
                key={key}
                rows={selectedLevel.rows}
                cols={selectedLevel.cols}
                mines={selectedLevel.mines}
                onGameEnd={submitGameResult}
            />
        </div>
    );
}
