import React, { useEffect, useState } from 'react';
import axios from 'axios';

function MyApplications() {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const token = localStorage.getItem('token');

                const response = await axios.get(
                    'http://localhost:8000/api/applications/my-applications',
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                setApplications(response.data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        fetchApplications();
    }, []);

    if (loading) {
        return <h2>Loading Applications...</h2>;
    }

    return (
        <div className="my-jobs-page">
            <div className="my-jobs-container">

                <h1>My Applications</h1>
                <p>Track your job applications here.</p>

                {applications.length === 0 ? (
                    <h3>You have not applied for any jobs yet.</h3>
                ) : (
                    <div className="my-jobs-grid">

                        {applications.map((application) => (
                            <div className="my-job-card" key={application._id}>

                                <h2>
                                    {application.job?.title || 'Job unavailable'}
                                </h2>

                                <h3>
                                    {application.job?.company || 'Company unavailable'}
                                </h3>

                                <p>
                                    <strong>Location:</strong>{' '}
                                    {application.job?.location || 'N/A'}
                                </p>

                                <p>
                                    <strong>Salary:</strong>{' '}
                                    {application.job?.salary || 'N/A'}
                                </p>

                                <p>
                                    <strong>Applied On:</strong>{' '}
                                    {new Date(application.appliedAt).toLocaleDateString()}
                                </p>

                                <p>
                                    <strong>Status:</strong>{' '}
                                    {application.status}
                                </p>

                            </div>
                        ))}

                    </div>
                )}

            </div>
        </div>
    );
}

export default MyApplications;