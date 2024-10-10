import dotenv from 'dotenv';
import express from 'express';
import passport from 'passport';
import session from 'express-session';
import authRoutes from '../routes/auth.js';
import dashboardRoutes from '../routes/dashboard.js';
import mainPageRoutes from '../routes/mainPage.js';
import db from '../db.js';
import { initPassport } from '../auth.js';

dotenv.config({ path: '.env.test' }); // Подгружаем файл .env.test

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

initPassport();
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/', authRoutes);
app.use('/', dashboardRoutes);
app.use('/', mainPageRoutes);

db.sync({ force: false }).then(() => {
    // Уберите этот вызов из экспорта
    // app.listen(PORT, console.log(`Server is running on port: ${PORT}`))
});

export default app; // Экспортируем приложение
