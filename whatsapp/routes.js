import express from 'express';
// import protectBot from '../middleware/authMiddleware.js';
import { subscribe, webhooks } from './controller.js';

const router = express.Router();

// router.route('/applyjob').post(protectBot, applyJob);
router.route('/webhooks').get(subscribe).post(webhooks);

export default router;