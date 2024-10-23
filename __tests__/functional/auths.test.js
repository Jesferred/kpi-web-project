import User from '../../models/User.js';
import request from 'supertest';
import server from '../../test/server_test.js';
import db from '../../db.js';

describe('Register user', () => {
    test('should register a new user', async () => {
        const response = await request(server)
            .post('/register')
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send('login=usertest1&email=testuser1@gmail.com&password=123456789');

        console.log(response.text);

        expect(response.statusCode).toBe(302);
        expect(response.headers.location).toBe('/login');

        const user = await User.findOne({ where: { email: 'testuser1@gmail.com' } });
        expect(user).not.toBeNull();
        expect(user.login).toBe('usertest1');
    });
});

afterAll(async () => {
    await User.destroy({ where: { email: 'testuser1@gmail.com' } });
    await db.close(); 
    server.close(); // Убедитесь, что server имеет метод close
});