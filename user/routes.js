import express from 'express';
import {
    signUpUser,
    signInUser,
    signOutUser,
    googleAuth,
    facebookAuth,
    getUserInfo,
    updateUserInfo,
    saveJob,
    savedJobs,
    applications
} from './controller.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/signup', signUpUser);
router.post('/signin', signInUser);
router.post('/signout', signOutUser);
router.post('/auth/google', googleAuth);
router.post('/auth/facebook', facebookAuth)
router.route('/info').get(protect, getUserInfo).put(protect, updateUserInfo);
router.route('/jobs').post(protect, saveJob).get(protect, savedJobs);
router.route('/jobs/applications').get(protect, applications);

export default router; 