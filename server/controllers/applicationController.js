
import Application from '../models/Application.js';
import Job from '../models/Job.js';

// APPLY FOR JOB
export const applyJob = async (req, res) => {
    try {
        if (req.user.role !== 'candidate') {
            return res.status(403).json({
                message: 'Only candidates can apply'
            });
        }

        const { jobId } = req.body;

        if (!jobId) {
            return res.status(400).json({
                message: 'Job ID is required'
            });
        }

        if (!req.file) {
            return res.status(400).json({
                message: 'Please upload your PDF resume'
            });
        }

        const job = await Job.findById(jobId);

        if (!job) {
            return res.status(404).json({
                message: 'Job not found'
            });
        }

        const application = await Application.create({
            job: jobId,
            candidate: req.user.id,
            resume: req.file.filename
        });

        res.status(201).json({
            message: 'Job applied successfully',
            application
        });

    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({
                message: 'You have already applied for this job'
            });
        }

        res.status(500).json({
            message: error.message
        });
    }
};

// CANDIDATE APPLICATIONS
export const getMyApplications = async (req, res) => {
    try {
        const applications = await Application.find({
            candidate: req.user.id
        })
        .populate('job')
        .sort({ appliedAt: -1 });

        res.status(200).json(applications);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// EMPLOYER APPLICATIONS
export const getJobApplications = async (req, res) => {
    try {
        if (req.user.role !== 'employer') {
            return res.status(403).json({
                message: 'Only employers can view applications'
            });
        }

        const jobs = await Job.find({
            employer: req.user.id
        }).select('_id');

        const jobIds = jobs.map(job => job._id);

        const applications = await Application.find({
            job: { $in: jobIds }
        })
        .populate('job')
        .populate('candidate', 'name email phone')
        .sort({ appliedAt: -1 });

        res.status(200).json(applications);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
// UPDATE APPLICATION STATUS
export const updateApplicationStatus = async (req, res) => {
    try {
        if (req.user.role !== 'employer') {
            return res.status(403).json({
                message: 'Only employers can update application status'
            });
        }

        const { status } = req.body;

        if (!['Accepted', 'Rejected'].includes(status)) {
            return res.status(400).json({
                message: 'Invalid application status'
            });
        }

        const application = await Application.findById(req.params.id)
            .populate('job');

        if (!application) {
            return res.status(404).json({
                message: 'Application not found'
            });
        }

        if (application.job.employer.toString() !== req.user.id) {
            return res.status(403).json({
                message: 'You cannot update this application'
            });
        }

        application.status = status;
        await application.save();

        res.status(200).json({
            message: `Application ${status} successfully`,
            application
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
