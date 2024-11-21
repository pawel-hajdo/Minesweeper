// app/results/page.tsx
"use client";
import { useEffect, useState } from "react";
import {Button} from "@nextui-org/button";
import {
    Table,
    TableHeader,
    TableBody,
    TableColumn,
    TableRow,
    TableCell
} from "@nextui-org/table";
import {Select, SelectItem} from "@nextui-org/select";

interface GameResult {
    id: number;
    username: string;
    time: number;
    difficulty: "easy" | "medium" | "hard";
}

const difficulties = [
    { label: "All", value: "" },
    { label: "Easy", value: "easy" },
    { label: "Medium", value: "medium" },
    { label: "Hard", value: "hard" },
];

const ResultsPage = () => {
    const [gameResults, setGameResults] = useState<GameResult[]>([]);
    const [selectedDifficulty, setSelectedDifficulty] = useState<string>("");

    // Fetch results from the API
    const fetchGameResults = async (difficulty: string = "") => {
        const response = await fetch(`/api/results?difficulty=${difficulty}`);
        const data = await response.json();
        console.log(data);
        setGameResults(data);
    };

    useEffect(() => {
        fetchGameResults(selectedDifficulty);
    }, [selectedDifficulty]);

    const handleSelectionChange = (e) => {
        setSelectedDifficulty(e.target.value)
    };

    // Format time to MM:SS
    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes}:${seconds.toString().padStart(2, "0")}`;
    };

    return (
        <div className="p-20">
            <div className="flex flex-row gap-5">
                <Select
                    label="Select Difficulty"
                    placeholder="Choose difficulty"
                    value={selectedDifficulty}
                    onChange={handleSelectionChange}
                    className="max-w-xs"
                >
                    {difficulties.map((difficulty) => (
                        <SelectItem key={difficulty.value} value={difficulty.value}>
                            {difficulty.label}
                        </SelectItem>
                    ))}
                </Select>

                <Button onPress={() => fetchGameResults(selectedDifficulty)}>Refresh Results</Button>
            </div>

            <Table aria-label="Game Results" className="mt-8">
                <TableHeader>
                    <TableColumn>Position</TableColumn>
                    <TableColumn>Username</TableColumn>
                    <TableColumn>Time</TableColumn>
                    <TableColumn>Difficulty</TableColumn>
                </TableHeader>
                <TableBody>
                    {gameResults.map((result, index) => (
                        <TableRow key={result.id}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{result.username}</TableCell>
                            <TableCell>{formatTime(result.time)}</TableCell>
                            <TableCell>{result.difficulty}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default ResultsPage;
