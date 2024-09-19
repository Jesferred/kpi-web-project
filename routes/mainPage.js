import express from 'express'
import authController from '../controllers/mainPage.js'

const router = express.Router();

router.get('/', authController.mainPageView);

export default router;