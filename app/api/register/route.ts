import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import prisma from '@/lib/prisma'

interface RegisterRequestBody {
    email: string;
    username: string;
    password: string;
}

export async function POST(request: Request) {
    try {
        const { email, username, password }: RegisterRequestBody = await request.json();

        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return NextResponse.json(
                { message: 'User with this email already exists' },
                { status: 400 }
            );
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await prisma.user.create({
            data: {
                email,
                username,
                password: hashedPassword,
            },
        });

        console.log('User created successfully:', newUser);


        return NextResponse.json(
            { message: 'User created successfully' },
            { status: 201 }
        );
    } catch (error) {
        // console.error('Error during registration:', error);

        return NextResponse.json(
            { message: 'Server error, please try again later' },
            { status: 500 }
        );
    }
}
