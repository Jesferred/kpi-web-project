import express from 'express';
import dashboardController from '../controllers/dashboard.js';
import { protectRoute }  from '../auth.js';

const router = express.Router();

router.get('/', protectRoute , dashboardController.dashboardView);

export default router;