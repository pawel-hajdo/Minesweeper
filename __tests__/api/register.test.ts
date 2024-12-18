import bcrypt from 'bcryptjs';
import prisma from '@/lib/prisma';
import { POST } from '@/app/api/register/route';
import { createMocks } from 'node-mocks-http';

jest.mock('@/lib/prisma', () => ({
    __esModule: true,
    default: {
        user: {
            findUnique: jest.fn(),
            create: jest.fn(),
        },
    },
}));

describe('Integration tests for POST /api/register', () => {
    const mockUser = {
        email: 'test@example.com',
        username: 'testuser',
        password: 'password123',
    };

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('should register a new user successfully', async () => {
        (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);
        (prisma.user.create as jest.Mock).mockResolvedValue({
            id: 1,
            email: mockUser.email,
            username: mockUser.username,
            password: await bcrypt.hash(mockUser.password, 10),
        });

        const { req } = createMocks({
            method: 'POST',
            body: mockUser,
        });

        req.json = jest.fn().mockResolvedValue(req.body);
        const response = await POST(req);

        expect(response.status).toBe(201);
        expect(await response.json()).toEqual({ message: 'User created successfully' });

    });

    test('should return 400 if user already exists', async () => {
        (prisma.user.findUnique as jest.Mock).mockResolvedValue({
            id: 1,
            email: mockUser.email,
            username: mockUser.username,
        });

        const { req } = createMocks({
            method: 'POST',
            body: mockUser,
        });

        req.json = jest.fn().mockResolvedValue(req.body);
        const response = await POST(req);

        expect(response.status).toBe(400);
        expect(await response.json()).toEqual({ message: 'User with this email already exists' });

    });

    test('should return 500 on server error', async () => {
        (prisma.user.findUnique as jest.Mock).mockRejectedValue(
            new Error('Database error')
        );

        const { req } = createMocks({
            method: 'POST',
            body: mockUser,
        });

        req.json = jest.fn().mockResolvedValue(req.body);
        const response = await POST(req);

        expect(response.status).toBe(500);
        expect(await response.json()).toEqual({ message: 'Server error, please try again later' });

    });
});
