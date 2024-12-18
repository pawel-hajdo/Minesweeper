import prisma from '@/lib/prisma';
import { POST } from '@/app/api/results/route';
import jwt from 'jsonwebtoken';
import {NextRequest} from "next/server";

jest.mock('@/lib/prisma', () => ({
    __esModule: true,
    default: {
        gameResult: {
            create: jest.fn(),
        },
    },
}));

jest.mock('jsonwebtoken', () => ({
    verify: jest.fn(),
}));

describe('Integration tests for POST /api/results', () => {
    const mockToken = 'mocked.token';
    const mockDecodedToken = { id: 1, username: 'testuser' };
    const mockGameResult = {
        username: 'testuser',
        time: 123,
        difficulty: 'easy',
    };

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('should submit a new game result successfully', async () => {
        (jwt.verify as jest.Mock).mockReturnValue(mockDecodedToken);

        (prisma.gameResult.create as jest.Mock).mockResolvedValue({
            id: 1,
            ...mockGameResult,
        });

        const mockRequest = new Request('https://localhost:3000/api/results', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(mockGameResult),
        });

        // Mock cookies
        Object.defineProperty(mockRequest, 'cookies', {
            value: {
                get: jest.fn().mockReturnValue({ value: mockToken }),
            },
        });

        const response = await POST(mockRequest as unknown as NextRequest);

        expect(response).toBeDefined();
        expect(response.status).toBe(201);
        const jsonResponse = await response.json();
        expect(jsonResponse).toEqual({
            id: 1,
            ...mockGameResult,
        });
    });

    test('should return 400 for invalid request body', async () => {
        const invalidBody = { username: '', time: -1, difficulty: 'invalid' };

        (jwt.verify as jest.Mock).mockReturnValue(mockDecodedToken);

        const mockRequest = new Request('https://localhost:3000/api/results', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(invalidBody),
        });

        // Mock cookies
        Object.defineProperty(mockRequest, 'cookies', {
            value: {
                get: jest.fn().mockReturnValue({ value: mockToken }),
            },
        });

        const response = await POST(mockRequest as unknown as NextRequest);

        expect(response).toBeDefined();
        expect(response.status).toBe(400);
        const jsonResponse = await response.json();
        expect(jsonResponse.message).toBe('Validation error');
        expect(jsonResponse.errors).toContain('Username is required');
        expect(jsonResponse.errors).toContain('Time must be a positive number');
        expect(jsonResponse.errors).toContain('Invalid enum value. Expected \'easy\' | \'medium\' | \'hard\', received \'invalid\'');
    });

    test('should return 401 if token is missing', async () => {
        const mockRequest = new Request('https://localhost:3000/api/results', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(mockGameResult),
        });

        Object.defineProperty(mockRequest, 'cookies', {
            value: {
                get: jest.fn().mockReturnValue(undefined),
            },
        });

        const response = await POST(mockRequest as unknown as NextRequest);

        expect(response).toBeDefined();
        expect(response?.status).toBe(401);
        expect(await response?.json()).toEqual({
            message: 'Unauthorized: Missing token',
        });
    });

    test('should return 500 on server error', async () => {
        (jwt.verify as jest.Mock).mockReturnValue(mockDecodedToken);

        (prisma.gameResult.create as jest.Mock).mockRejectedValue(
            new Error('Database error')
        );

        const mockRequest = new Request('https://localhost:3000/api/results', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(mockGameResult),
        });

        Object.defineProperty(mockRequest, 'cookies', {
            value: {
                get: jest.fn().mockReturnValue({ value: mockToken }),
            },
        });

        const response = await POST(mockRequest as unknown as NextRequest);

        expect(response).toBeDefined();
        expect(response?.status).toBe(500);
        expect(await response?.json()).toEqual({
            message: 'Database error',
        });
    });
});
