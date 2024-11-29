import express from 'express';
import protectBot from '../middleware/authMiddleware.js';
import { createPDF } from './controller.js';

const router = express.Router();

router.route('/generate').post(protectBot, createPDF);


export default router;