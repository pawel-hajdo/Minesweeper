import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma'
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET as string;

interface LoginRequestBody {
    email: string;
    password: string;
}

export async function POST(request: Request) {
    try {
        const { email, password }: LoginRequestBody = await request.json();

        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            return NextResponse.json(
                { message: 'Invalid email or password' },
                { status: 401 }
            );
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return NextResponse.json(
                { message: 'Invalid email or password' },
                { status: 401 }
            );
        }

        const token = jwt.sign(
            {
                userId: user.id,
                email: user.email,
                username: user.username,
            },
            JWT_SECRET,
            { expiresIn: '24h' }
        );

        const response = NextResponse.json(
            {
                message: 'Login successful',
                user: {
                    id: user.id,
                    email: user.email,
                    username: user.username,
                },
            },
            { status: 200 }
        );

        response.cookies.set({
            name: 'token',
            value: token,
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 60 * 60 * 24, // 24h
        });

        response.cookies.set({
            name: 'username',
            value: user.username,
            httpOnly: false,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 60 * 60 * 24, // 24h
        });

        return response;
    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json(
            { message: 'Server error' },
            { status: 500 }
        );
    }
}
