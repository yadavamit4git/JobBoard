
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Jobs() {
    const navigate = useNavigate();
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [jobType, setJobType] = useState('All');

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await axios.get(
                    'http://localhost:8000/api/jobs'
                );
                setJobs(response.data);
            } catch (error) {
                console.log('Error fetching jobs:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchJobs();
    }, []);

    const filteredJobs = jobs.filter((job) => {
        const matchesSearch =
            `${job.title} ${job.company} ${job.location}`
                .toLowerCase()
                .includes(search.toLowerCase());

        const matchesType =
            jobType === 'All' || job.jobType === jobType;

        return matchesSearch && matchesType;
    });

    return (
        <div className="findjobs-page">

            {/* HERO SECTION */}

            <section className="jobs-hero">
                <span className="jobs-tag">CAREER OPPORTUNITIES</span>

                <h1>Find Your <span>Dream Job</span></h1>

                <p>
                    Discover opportunities that match your skills,
                    passion and career goals.
                </p>

                <div className="jobs-search-box">
                    <span>🔍</span>
                    <input
                        type="text"
                        placeholder="Job title, company or location..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
            </section>

            {/* JOB LIST SECTION */}

            <section className="jobs-content">

                <div className="jobs-heading">
                    <div>
                        <h2>Latest Job Openings</h2>
                        <p>Explore the latest opportunities</p>
                    </div>

                    <span className="jobs-count">
                        {filteredJobs.length} Jobs Available
                    </span>
                </div>

                {/* FILTER */}

                <div className="jobs-filter">
                    <label>Job Type:</label>

                    <select
                        value={jobType}
                        onChange={(e) => setJobType(e.target.value)}
                    >
                        <option value="All">All Jobs</option>
                        <option value="Full Time">Full Time</option>
                        <option value="Part Time">Part Time</option>
                        <option value="Internship">Internship</option>
                        <option value="Remote">Remote</option>
                    </select>
                </div>

                {/* JOB CARDS */}

                {loading ? (
                    <div className="jobs-message">
                        Loading jobs...
                    </div>
                ) : filteredJobs.length > 0 ? (

                    <div className="professional-jobs-grid">

                        {filteredJobs.map((job) => (
                            <div className="professional-job-card" key={job._id}>

                                <div className="job-card-top">
                                    <div className="company-icon">
                                        {job.company?.charAt(0).toUpperCase()}
                                    </div>

                                    <span className="job-type-badge">
                                        {job.jobType}
                                    </span>
                                </div>

                                <h3>{job.title}</h3>

                                <h4>{job.company}</h4>

                                <div className="job-info">
                                    <span> {job.location}</span>
                                    <span> {job.salary}</span>
                                </div>

                                <p className="professional-job-description">
                                    {job.description}
                                </p>

                                <div className="job-requirements">
                                    <strong>Requirements</strong>
                                    <p>{job.requirements}</p>
                                </div>

                                <div className="job-card-footer">
                                    <span>Posted on JobBoard</span>
                                    <button onClick={() => navigate(`/jobs/${job._id}`)}>
                                         View Details
                                    </button>
                                </div>

                            </div>
                        ))}

                    </div>

                ) : (
                    <div className="jobs-empty">
                        <h2>No Jobs Found</h2>
                        <p>Try another search or change the job type filter.</p>
                    </div>
                )}

            </section>
        </div>
    );
}

export default Jobs;
