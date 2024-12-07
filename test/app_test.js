import dotenv from 'dotenv';
import express from 'express';
import passport from 'passport';
import session from 'express-session';
import authRoutes from '../routes/auth.js';
import dashboardRoutes from '../routes/dashboard.js';
import mainPageRoutes from '../routes/mainPage.js';
import db from '../db.js';
import { initPassport } from '../auth.js';

dotenv.config({ path: '.env.test' }); // Загружаем переменные окружения для тестов

const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Настройка сессий и Passport
initPassport();
app.use(session({
  secret: 'secret',
  saveUninitialized: true,
  resave: true,
}));

app.use(passport.initialize());
app.use(passport.session());

// Маршруты
app.use('/', authRoutes);
app.use('/', dashboardRoutes);
app.use('/', mainPageRoutes);

export default app; // Экспорт приложения без запуска
