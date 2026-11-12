
import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: '',
        password: ''
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
            const res = await axios.post(
                'http://localhost:8000/api/auth/login',
                form
            );

            localStorage.setItem('token', res.data.token);
            localStorage.setItem('user', JSON.stringify(res.data.user));

            setMessage('Login successful!');

            if (res.data.user.role === 'employer') {
                navigate('/employer-dashboard');
            } else {
                navigate('/candidate-dashboard');
            }

        } catch (error) {
            setMessage(
                error.response?.data?.message || 'Login failed'
            );
        }
    };

    return (
        <div className="auth-container">
            <form className="auth-form" onSubmit={handleSubmit}>
                <h2>Welcome Back</h2>

                <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={form.email}
                    onChange={handleChange}
                    required
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChange}
                    required
                />

                <button type="submit">Login</button>

                <p>{message}</p>

                <p>
                    New User? <Link to="/register">Register</Link>
                </p>
            </form>
        </div>
    );
}

export default Login;
