import express from 'express';
import dashboardController from '../controllers/dashboard.js';
import userPasswordsController from '../controllers/userPassword.js';
import { protectRoute }  from '../auth.js';

const router = express.Router();

router.get('/dashboard', protectRoute , dashboardController.dashboardView, userPasswordsController.getUserPassword);
router.post('/dashboard/add', userPasswordsController.savePassword)

export default router;