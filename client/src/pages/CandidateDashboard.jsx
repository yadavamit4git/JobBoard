import React from 'react';
import { useNavigate } from 'react-router-dom';

function CandidateDashboard() {
    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem('user') || 'null');

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    return (
        <div className="dashboard-page">
            <div className="dashboard-container">

                <h1>Candidate Dashboard</h1>

                <h3>Welcome, {user?.name || 'Candidate'}!</h3>

                <p>Manage your job search and applications.</p>

                <div className="dashboard-cards">

                    <div className="dashboard-card">
                        <h2>Find Jobs</h2>
                        <p>Explore available job opportunities.</p>
                        <button onClick={() => navigate('/jobs')}>
                            Find Jobs
                        </button>
                    </div>

                    <div className="dashboard-card">
                        <h2>My Applications</h2>
                        <p>Check your applied jobs and their status.</p>
                        <button onClick={() => navigate('/my-applications')}>
                            View Applications
                        </button>
                    </div>

                </div>

                <button className="logout-btn" onClick={logout}>
                    Logout
                </button>

            </div>
        </div>
    );
}

export default CandidateDashboard;