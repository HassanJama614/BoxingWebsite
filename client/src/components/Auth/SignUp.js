// client/src/components/Auth/SignUp.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import api from '../../services/api';
import GoogleSignInButton from './GoogleSignInButton';
import './AuthForm.css';

const SignUp = () => {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        if (password.length < 6) {
            setError("Password must be at least 6 characters long.");
            return;
        }
        // Optional: Basic client-side username check (backend does the thorough check)
        // if (username && username.length < 3) {
        //     setError("Username should be at least 3 characters if provided.");
        //     return;
        // }

        try {
            const response = await api.post('/auth/register', { name, email, password, username });
            login(response.data, response.data.token);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to sign up. Please try again.');
            console.error("Signup error:", err.response?.data || err.message)
        }
    };

    return (
        <div className="auth-form-container">
            <h2 className="auth-form-title">Create Account</h2> {/* Optional: Add a title */}
            <form onSubmit={handleSubmit} className="auth-form">
                {error && <p className="error-message">{error}</p>}
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label htmlFor="username">Username (optional):</label>
                    <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                    {/* Removed the small hint text */}
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <button type="submit" className="auth-button">Sign Up</button>
            </form>
            <div className="or-divider">OR</div>
            <GoogleSignInButton />
        </div>
    );
};

export default SignUp;