import User from '../models/User.js';
import request from 'supertest';
import app from '../test/app_test.js'; // Импортируем приложение
import db from '../db.js';

let server; // Переменная для хранения запущенного сервера

beforeAll(async () => {
    // Синхронизируем базу данных перед тестами
    await db.sync({ force: false });

    // Запускаем сервер
    server = app.listen(5000, () => {
        console.log('Test server is running on port 5000');
    });
});

afterAll(async () => {
    // Удаляем тестового пользователя
    await User.destroy({ where: { email: 'testuser1@gmail.com' } });

    // Закрываем соединение с базой данных
    await db.close();

    // Закрываем сервер
    if (server) {
        await server.close();
    }
});

describe('Register user', () => {
    test('should register a new user', async () => {
        const response = await request(server)
            .post('/register')
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send('login=usertest1&email=testuser1@gmail.com&password=123456789');

        console.log(response.text);

        // Проверяем, что сервер вернул редирект на страницу логина
        expect(response.statusCode).toBe(302);
        expect(response.headers.location).toBe('/login');

        // Проверяем, что пользователь создан в базе данных
        const user = await User.findOne({ where: { email: 'testuser1@gmail.com' } });
        expect(user).not.toBeNull();
        expect(user.login).toBe('usertest1');
    });
});
