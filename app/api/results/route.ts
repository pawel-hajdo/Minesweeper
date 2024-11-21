import {NextRequest, NextResponse} from "next/server";
import prisma from "@/lib/prisma";
import jwt from "jsonwebtoken";
import { z } from "zod";

const JWT_SECRET = process.env.JWT_SECRET;

const SubmitRequestSchema = z.object({
    username: z.string().min(1, "Username is required"),
    time: z.number().nonnegative("Time must be a positive number"),
    difficulty: z.enum(["easy", "medium", "hard"], "Invalid difficulty level")
});

async function verifyToken(request: NextRequest) {
    const token = request.cookies.get('token')?.value;

    if (!token) {
        throw new Error('Unauthorized: Missing token');
    }

    try {
        return jwt.verify(token, JWT_SECRET as string);
    } catch (error) {
        throw new Error('Invalid token');
    }
}

export async function GET(request: Request) {
    try {
        await verifyToken(request);

        const { searchParams } = new URL(request.url);
        const difficulty = searchParams.get("difficulty")

        if (difficulty && !["easy", "medium", "hard"].includes(difficulty)) {
            return NextResponse.json(
                {message: "Invalid difficulty level"},
                {status: 400}
            )
        }

        const gameResults = await prisma.gameResult.findMany({
            where: difficulty ? { difficulty } : {},
            orderBy: { time: "asc" },
            take: 10,
        });

        return NextResponse.json(gameResults, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { message: error.message || "Failed to fetch game results" },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    try {
        await verifyToken(request);

        const requestBody = await request.json();

        const validatedData = SubmitRequestSchema.parse(requestBody);

        const newGameResult = await prisma.gameResult.create({
            data: validatedData,
        });

        return NextResponse.json(newGameResult, { status: 201 });
    } catch (error) {
        if (error instanceof z.ZodError) {
            console.error("Validation errors:", error.errors);
            return NextResponse.json(
                {
                    message: "Validation error",
                    errors: error.errors.map(e => e.message)
                },
                { status: 400 }
            );
        }

        if (error instanceof Error) {
            return NextResponse.json(
                { message: "Failed to submit game result" },
                { status: 500 }
            );
        }
    }
}
