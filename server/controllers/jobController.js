
import Job from '../models/Job.js';

// Add Job
export const addJob = async (req, res) => {
    try {
        const {
            title,
            company,
            location,
            salary,
            jobType,
            description,
            requirements
        } = req.body;

        if (
            !title || !company || !location ||
            !salary || !jobType ||
            !description || !requirements
        ) {
            return res.status(400).json({
                message: 'All fields are required'
            });
        }

        const job = await Job.create({
            title,
            company,
            location,
            salary,
            jobType,
            description,
            requirements,
            employer: req.user.id
        });

        res.status(201).json({
            message: 'Job posted successfully',
            job
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// Get All Jobs
export const getJobs = async (req, res) => {
    try {
        const jobs = await Job.find()
            .populate('employer', 'name email')
            .sort({ createdAt: -1 });

        res.status(200).json(jobs);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// Get Single Job
export const getJobById = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id)
            .populate('employer', 'name email');

        if (!job) {
            return res.status(404).json({
                message: 'Job not found'
            });
        }

        res.json(job);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// Get Employer Jobs
export const getMyJobs = async (req, res) => {
    try {
        const jobs = await Job.find({
            employer: req.user.id
        }).sort({ createdAt: -1 });

        res.json(jobs);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
