
import { useEffect, useState } from 'react';
import axios from 'axios';

function MyJobs() {
    const [jobs, setJobs] = useState([]);
    const [message, setMessage] = useState('Loading jobs...');

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const token = localStorage.getItem('token');

                const res = await axios.get(
                    'http://localhost:8000/api/jobs/my-jobs',
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                setJobs(res.data);
                setMessage('');

            } catch (error) {
                setMessage(
                    error.response?.data?.message || 'Unable to load jobs'
                );
            }
        };

        fetchJobs();
    }, []);

    return (
        <div className="myjobs-container">

            <h1>My Posted Jobs</h1>

            {message && <p>{message}</p>}

            <div className="myjobs-grid">

                {jobs.map((job) => (
                    <div className="myjob-card" key={job._id}>

                        <h2>{job.title}</h2>

                        <p><strong>Company:</strong> {job.company}</p>
                        <p><strong>Location:</strong> {job.location}</p>
                        <p><strong>Salary:</strong> {job.salary}</p>
                        <p><strong>Job Type:</strong> {job.jobType}</p>

                        <p>{job.description}</p>

                    </div>
                ))}

                {!message && jobs.length === 0 && (
                    <p>You have not posted any jobs yet.</p>
                )}

            </div>
        </div>
    );
}

export default MyJobs;
