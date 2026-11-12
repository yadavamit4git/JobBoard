import React from 'react';
import { useNavigate } from 'react-router-dom';

function EmployerDashboard() {
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

                <h1>Employer Dashboard</h1>

                <h3>Welcome, {user?.name || 'Employer'}!</h3>

                <p>Manage your job postings and candidates.</p>

                <div className="dashboard-cards">

                    <div className="dashboard-card">
                        <h2>Post a Job</h2>
                        <p>Create a new job opportunity.</p>
                        <button onClick={() => navigate('/post-job')}>
                            Post Job
                        </button>
                    </div>

                    <div className="dashboard-card">
                        <h2>My Jobs</h2>
                        <p>Manage your posted jobs.</p>
                        <button onClick={() => navigate('/my-jobs')}>
                            View My Jobs
                        </button>
                    </div>

                    <div className="dashboard-card">
                        <h2>Applications</h2>
                        <p>View candidates who applied.</p>
                        <button onClick={() => navigate('/employer-applications')}>
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

export default EmployerDashboard;