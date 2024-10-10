import express from 'express';
import dashboardController from '../controllers/dashboard.js';
import { protectRoute }  from '../auth.js';

const router = express.Router();

router.get('/dashboard', protectRoute , dashboardController.dashboardView, dashboardController.getUserPassword);
router.post('/dashboard/add', dashboardController.savePassword)
router.get('/dashboard/delete/:id', dashboardController.deleteUserPassword)
router.get('/dashboard/decrypt/:id', dashboardController.decryptPassword)
router.post('/generate-password', dashboardController.generateNewPassword);
router.get('/generate-password', dashboardController.viewTestPage);

export default router;