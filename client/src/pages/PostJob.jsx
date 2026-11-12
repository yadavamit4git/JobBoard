
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function PostJob() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        title: '',
        company: '',
        location: '',
        salary: '',
        jobType: 'Full Time',
        description: '',
        requirements: ''
    });

    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem('token');

            const res = await axios.post(
                'http://localhost:8000/api/jobs/add',
                form,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setMessage(res.data.message);

            setTimeout(() => {
                navigate('/my-jobs');
            }, 1000);

        } catch (error) {
            setMessage(
                error.response?.data?.message || 'Job posting failed'
            );
        }
    };

    return (
        <div className="postjob-container">

            <form className="postjob-form" onSubmit={handleSubmit}>

                <h2>Post a New Job</h2>

                <input
                    type="text"
                    name="title"
                    placeholder="Job Title"
                    value={form.title}
                    onChange={handleChange}
                    required
                />

                <input
                    type="text"
                    name="company"
                    placeholder="Company Name"
                    value={form.company}
                    onChange={handleChange}
                    required
                />

                <input
                    type="text"
                    name="location"
                    placeholder="Job Location"
                    value={form.location}
                    onChange={handleChange}
                    required
                />

                <input
                    type="text"
                    name="salary"
                    placeholder="Salary (Example: 25000-40000)"
                    value={form.salary}
                    onChange={handleChange}
                    required
                />

                <select
                    name="jobType"
                    value={form.jobType}
                    onChange={handleChange}
                >
                    <option value="Full Time">Full Time</option>
                    <option value="Part Time">Part Time</option>
                    <option value="Internship">Internship</option>
                    <option value="Remote">Remote</option>
                </select>

                <textarea
                    name="description"
                    placeholder="Job Description"
                    value={form.description}
                    onChange={handleChange}
                    required
                />

                <textarea
                    name="requirements"
                    placeholder="Job Requirements"
                    value={form.requirements}
                    onChange={handleChange}
                    required
                />

                <button type="submit">Post Job</button>

                <p>{message}</p>

            </form>
        </div>
    );
}

export default PostJob;
