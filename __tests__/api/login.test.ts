import { createMocks } from 'node-mocks-http';
import { POST } from '../../app/api/login/route';
import prisma from '../../lib/prisma';
import bcrypt from 'bcryptjs';

describe('Integration tests for POST /api/login', () => {
    let user: { password: string; email: string; username: string };

    beforeAll(async () => {
        user = {
            email: 'test@example.com',
            username: 'testuser',
            password: await bcrypt.hash('password123', 10),
        };

        await prisma.user.create({
            data: user,
        });
    });

    afterAll(async () => {
        await prisma.user.deleteMany();
    });

    test('should return 401 if user is not found', async () => {
        const { req } = createMocks({
            method: 'POST',
            body: { email: 'nonexistent@example.com', password: 'password123' },
        });

        req.json = jest.fn().mockResolvedValue(req.body);
        const response = await POST(req);

        expect(response.status).toBe(401);
        expect(await response.json()).toEqual({ message: 'Invalid email or password' });
    });

    test('should return 401 if password is incorrect', async () => {
        const { req } = createMocks({
            method: 'POST',
            body: { email: user.email, password: 'wrongpassword' },
        });
        req.json = jest.fn().mockResolvedValue(req.body);

        const response = await POST(req);

        expect(response.status).toBe(401);
        expect(await response.json()).toEqual({ message: 'Invalid email or password' });
    });

    test('should return 500 if there is a server error', async () => {
        prisma.user.findUnique = jest.fn().mockRejectedValue(new Error('Database error'));

        const { req } = createMocks({
            method: 'POST',
            body: { email: user.email, password: 'password123' },
        });

        const response = await POST(req);

        expect(response.status).toBe(500);
        expect(await response.json()).toEqual({ message: 'Server error' });
    });
});
