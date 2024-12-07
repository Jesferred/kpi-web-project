import request from 'supertest';
import app from '../test/app_test.js'; // Импортируем приложение
import db from '../db.js';

let server; // Для хранения запущенного сервера

beforeAll(async () => {
  // Синхронизация базы данных перед тестами
  await db.sync({ force: false });

  // Запуск сервера
  server = app.listen(5000, () => {
    console.log('Test server is running on port 5000');
  });
});

afterAll(async () => {
  // Закрытие сервера
  if (server) {
    await server.close();
  }

  // Закрытие соединения с базой данных
  await db.close();
});

describe('Login Page', () => {
  it('should render the login page', async () => {
    const response = await request(server).get('/login');
    expect(response.statusCode).toBe(200);
    expect(response.text).toContain('Log in');
  });
});

describe('Main page', () => {
  it('should render the main page', async () => {
    const response = await request(server).get('/');
    expect(response.statusCode).toBe(200);
    expect(response.text).toContain('Log in');
  });
});

describe('Register page', () => {
  it('should render the register page', async () => {
    const response = await request(server).get('/register');
    expect(response.statusCode).toBe(200);
    expect(response.text).toContain('Sign up');
  });
});
