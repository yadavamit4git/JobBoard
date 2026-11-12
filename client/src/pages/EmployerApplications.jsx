import React, { useEffect, useState } from 'react';
import axios from 'axios';

function EmployerApplications() {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchApplications = async () => {
        try {
            const token = localStorage.getItem('token');

            const response = await axios.get(
                'http://localhost:8000/api/applications/employer-applications',
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

    useEffect(() => {
        fetchApplications();
    }, []);

    const updateStatus = async (id, status) => {
        try {
            const token = localStorage.getItem('token');

            const response = await axios.put(
                `http://localhost:8000/api/applications/update-status/${id}`,
                { status },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            alert(response.data.message);

            setApplications((previous) =>
                previous.map((application) =>
                    application._id === id
                        ? { ...application, status }
                        : application
                )
            );

        } catch (error) {
            alert(
                error.response?.data?.message ||
                'Unable to update application'
            );
        }
    };

    if (loading) return <h2>Loading Applications...</h2>;

    return (
        <div className="my-jobs-page">
            <div className="my-jobs-container">

                <h1>Received Applications</h1>
                <p>Manage candidates who applied for your jobs.</p>

                {applications.length === 0 ? (
                    <h3>No applications received yet.</h3>
                ) : (
                    <div className="my-jobs-grid">

                        {applications.map((application) => (
                            <div className="my-job-card" key={application._id}>

                                <h2>{application.candidate?.name}</h2>

                                <p>
                                    <strong>Email:</strong>{' '}
                                    {application.candidate?.email}
                                </p>

                                <p>
                                    <strong>Phone:</strong>{' '}
                                    {application.candidate?.phone || 'Not provided'}
                                </p>
                                {application.resume && (
    <p>
        <strong>Resume:</strong>{' '}
        <a
            href={`http://localhost:8000/uploads/${encodeURIComponent(application.resume)}`}
            target="_blank"
            rel="noopener noreferrer"
        >
            View Resume
        </a>
    </p>
)}

                                <hr />

                                <h3>{application.job?.title}</h3>

                                <p>
                                    <strong>Company:</strong>{' '}
                                    {application.job?.company}
                                </p>

                                <p>
                                    <strong>Applied On:</strong>{' '}
                                    {new Date(application.appliedAt).toLocaleDateString()}
                                </p>

                                <p>
                                    <strong>Status:</strong>{' '}
                                    <span className={`application-status ${application.status.toLowerCase()}`}>
                                        {application.status}
                                    </span>
                                </p>

                                {application.status === 'Pending' && (
                                    <div className="application-actions">

                                        <button
                                            className="accept-btn"
                                            onClick={() => updateStatus(application._id, 'Accepted')}
                                        >
                                            Accept
                                        </button>

                                        <button
                                            className="reject-btn"
                                            onClick={() => updateStatus(application._id, 'Rejected')}
                                        >
                                            Reject
                                        </button>

                                    </div>
                                )}

                            </div>
                        ))}

                    </div>
                )}

            </div>
        </div>
    );
}

export default EmployerApplications;