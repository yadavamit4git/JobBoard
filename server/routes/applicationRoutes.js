import express from 'express';

import {
    applyJob,
    getMyApplications,
    getJobApplications,
    updateApplicationStatus
} from '../controllers/applicationController.js';

import { verifyToken } from '../middleware/authMiddleware.js';
import upload from '../middleware/uploadMiddleware.js';

const router = express.Router();

router.post(
    '/apply',
    verifyToken,
    upload.single('resume'),
    applyJob
);

router.get('/my-applications', verifyToken, getMyApplications);

router.get('/employer-applications', verifyToken, getJobApplications);

router.put('/update-status/:id', verifyToken, updateApplicationStatus);

export default router;