import app from './app_test.js';
import db from '../db.js';

const PORT = process.env.PORT || 5000;

let server;

export const startTestServer = async () => {
  // Подключение к базе данных
  await db.sync({ force: false });

  // Запуск сервера
  server = app.listen(PORT, () => {
    console.log(`Test server is running on port: ${PORT}`);
  });
};

export const stopTestServer = async () => {
  // Закрытие сервера
  if (server) {
    await server.close();
  }

  // Закрытие соединений базы данных
  if (db) {
    await db.close();
  }
};
