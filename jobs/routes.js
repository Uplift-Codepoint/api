import express from 'express';
import { applyJob} from './controller.js';

const router = express.Router();

router.route('/apply').post(applyJob);

export default router;