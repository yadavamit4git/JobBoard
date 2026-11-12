import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function JobDetails() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);
    const [resume, setResume] = useState(null);

    useEffect(() => {
        const fetchJob = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:8000/api/jobs/${id}`
                );

                setJob(response.data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        fetchJob();
    }, [id]);

    const handleApply = async () => {
        const token = localStorage.getItem('token');
        const user = JSON.parse(localStorage.getItem('user') || 'null');

        if (!token) {
            alert('Please login first');
            navigate('/login');
            return;
        }

        if (user?.role !== 'candidate') {
            alert('Only candidates can apply');
            return;
        }

        if (!resume) {
            alert('Please select your PDF resume');
            return;
        }

        const formData = new FormData();
        formData.append('jobId', id);
        formData.append('resume', resume);

        try {
            const response = await axios.post(
                'http://localhost:8000/api/applications/apply',
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            alert(response.data.message);
            navigate('/my-applications');

        } catch (error) {
            alert(
                error.response?.data?.message ||
                'Unable to apply for this job'
            );
        }
    };

    if (loading) return <h2>Loading job details...</h2>;

    if (!job) return <h2>Job not found.</h2>;

    return (
        <div className="job-details-page">
            <div className="job-details-card">

                <h1>{job.title}</h1>
                <h3>{job.company}</h3>

                <p><strong>Location:</strong> {job.location}</p>
                <p><strong>Salary:</strong> {job.salary}</p>
                <p><strong>Job Type:</strong> {job.jobType}</p>

                <hr />

                <h2>Job Description</h2>
                <p>{job.description}</p>

                <h2>Requirements</h2>
                <p>{job.requirements}</p>

                <h2>Upload Resume (PDF)</h2>

                <input
                    type="file"
                    accept=".pdf,application/pdf"
                    onChange={(e) => setResume(e.target.files[0])}
                />

                {resume && (
                    <p>Selected: {resume.name}</p>
                )}

                <button onClick={handleApply}>
                    Apply Now
                </button>

                <button onClick={() => navigate('/jobs')}>
                    Back to Jobs
                </button>

            </div>
        </div>
    );
}

export default JobDetails;