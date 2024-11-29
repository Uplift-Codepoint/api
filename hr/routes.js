import express from 'express';
import {
    getJob,
    getJobs,
    postJob,
    modifyJob,
    deleteJob,
    getApplications,
    getStats,
    sms
} from './controller.js';

import { protect } from '../middleware/hrMiddleware.js'

const router = express.Router()

router.route('/').get(protect, getStats)
router.route('/jobs').get(protect, getJobs).post(protect, postJob);
router.route('/jobs/id').get(getJob).delete(protect, deleteJob).put(protect, modifyJob);
router.route('/jobs/applications').get(protect, getApplications)
router,route('/invite').post(protect, sms)

export default router;