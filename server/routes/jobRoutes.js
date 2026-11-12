
import express from 'express';

import {
    addJob,
    getJobs,
    getJobById,
    getMyJobs
} from '../controllers/jobController.js';

import {
    verifyToken,
    employerOnly
} from '../middleware/authMiddleware.js';

const router = express.Router();

// All Jobs
router.get('/', getJobs);

// Employer Posts Job
router.post(
    '/add',
    verifyToken,
    employerOnly,
    addJob
);

// Employer's Jobs
router.get(
    '/my-jobs',
    verifyToken,
    employerOnly,
    getMyJobs
);

// Single Job (Always Keep Last)
router.get('/:id', getJobById);

export default router;
