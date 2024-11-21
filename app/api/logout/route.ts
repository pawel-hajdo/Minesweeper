import { NextResponse } from 'next/server';

export async function POST() {
    try {
        const response = NextResponse.json(
            { success: true },
            { status: 200 }
        );

        response.cookies.delete('token');
        response.cookies.delete('username');

        return response;
    } catch (error) {
        return NextResponse.json(
            { success: false },
            { status: 500 }
        );
    }
}
