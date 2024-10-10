import User from '../../models/User.js';
import request from 'supertest';
import server from '../../test/app_test.js';
import db from '../../db.js';

describe('Register user', () => {
    it('should register a new user', async () => {
        const response = await request(server)
            .post('/register')
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send('login=usertest&email=testuser@gmail.com&password=123456789');

        console.log(response.text);

        expect(response.statusCode).toBe(302);
        expect(response.headers.location).toBe('/login');

        const user = await User.findOne({ where: { email: 'testuser@gmail.com' } });
        expect(user).not.toBeNull();
        expect(user.login).toBe('usertest');
    });
});

afterAll(async () => {
    try {
        await User.destroy({ where: { email: 'testuser@gmail.com' } });
        await db.close(); // Закрываем соединение с базой данных
    } catch (error) {
        console.error('Error cleaning up test user:', error);
    }
});
