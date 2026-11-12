
import { Link } from 'react-router-dom';

function Home() {
    const jobs = [
        {
            title: 'React Developer',
            company: 'Tech Solutions',
            location: 'Surat',
            salary: '₹25,000 - ₹40,000'
        },
        {
            title: 'Node.js Developer',
            company: 'Web Technologies',
            location: 'Ahmedabad',
            salary: '₹30,000 - ₹50,000'
        },
        {
            title: 'UI/UX Designer',
            company: 'Creative Studio',
            location: 'Mumbai',
            salary: '₹20,000 - ₹35,000'
        }
    ];

    return (
        <div>
            <section className="hero">
                <h1>Find Your Dream Job</h1>

                <p>
                    Discover thousands of job opportunities
                    and build your career.
                </p>

                <Link to="/jobs" className="hero-btn">
                    Explore Jobs
                </Link>
            </section>

            <section className="featured">
                <h2>Featured Jobs</h2>

                <div className="job-container">
                    {jobs.map((job, index) => (
                        <div className="job-card" key={index}>
                            <h3>{job.title}</h3>
                            <p>{job.company}</p>
                            <p>{job.location}</p>
                            <p>{job.salary}</p>

                            <Link to="/jobs">
                                View Details
                            </Link>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}

export default Home;
