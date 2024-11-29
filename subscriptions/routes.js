import express from 'express';
import { subscribe } from './controller.js';
import { protect } from './authMiddleware.js'

const router = express.Router();

router.route('/invoice').post(protect, subscribe);

export default router;