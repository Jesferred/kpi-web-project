import express from 'express';
import dashboardController from '../controllers/dashboard.js';
import { protectRoute } from '../auth.js';

const router = express.Router();

// Страница с дашбордом пользователя, которая включает все пароли
router.get('/dashboard', protectRoute, dashboardController.dashboardView);

// Получение всех паролей пользователя
router.get('/dashboard/passwords', protectRoute, dashboardController.getUserPassword);

// Добавление нового пароля
router.post('/dashboard/add', dashboardController.savePassword);

// Редактирование существующего пароля по его id
router.post('/dashboard/edit/:id', dashboardController.updateUserPassword);

// Удаление пароля по его id
router.get('/dashboard/delete/:id', dashboardController.deleteUserPassword);

// Дешифрование пароля по его id
router.get('/dashboard/decrypt/:id', dashboardController.decryptPassword);

// Получение конкретного пароля по id
router.get('/dashboard/get-password/:id', protectRoute, dashboardController.getUserPasswordById);

// Генерация нового пароля
router.post('/dashboard/generate-password', dashboardController.generateNewPassword);

// Страница тестирования генерации паролей
router.get('/generate-password', dashboardController.viewTestPage);

export default router;
