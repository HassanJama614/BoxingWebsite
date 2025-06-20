// client/src/pages/InstructorApplicationPage.js
import React, { useState } from 'react';
import api from '../services/api';
import './InstructorApplicationPage.css'; // Create or rename this CSS file

const InstructorApplicationPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phoneNumber: '',
        bio: '',
        proposedClassIdea: ''
    });
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { name, email, phoneNumber, bio, proposedClassIdea } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        setLoading(true);
        setMessage('');
        setError('');

        try {
            const res = await api.post('/instructor-applications', formData);
            setMessage(res.data.message || 'Application submitted successfully!');
            setFormData({ // Clear form
                name: '', email: '', phoneNumber: '', bio: '', proposedClassIdea: ''
            });
        } catch (err) {
            const errors = err.response?.data?.error; // If backend sends array of validation errors
            if (Array.isArray(errors)) {
                setError(errors.join(', '));
            } else {
                setError(err.response?.data?.message || 'An error occurred. Please try again.');
            }
            console.error("Application submission error:", err.response?.data || err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="instructor-app-container page-wrapper-contained" style={{ paddingTop: '90px' }}>
            <h2>Become an Instructor</h2>
            <p className="page-subtitle">Interested in teaching at Boxingly? Fill out the form below to apply!</p>

            <form onSubmit={onSubmit} className="instructor-app-form">
                {message && <p className="success-message">{message}</p>}
                {error && <p className="error-message">{error}</p>}

                <div className="form-group">
                    <label htmlFor="name">Full Name *</label>
                    <input type="text" name="name" value={name} onChange={onChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email Address *</label>
                    <input type="email" name="email" value={email} onChange={onChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="phoneNumber">Phone Number (Optional)</label>
                    <input type="tel" name="phoneNumber" value={phoneNumber} onChange={onChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="bio">Tell Us About Yourself & Your Experience *</label>
                    <textarea name="bio" value={bio} onChange={onChange} rows="6" required />
                    <small>Include your boxing experience, any teaching background, and why you're passionate about coaching.</small>
                </div>
                <div className="form-group">
                    <label htmlFor="proposedClassIdea">Proposed Class Idea (Optional)</label>
                    <textarea name="proposedClassIdea" value={proposedClassIdea} onChange={onChange} rows="3" />
                    <small>Briefly describe a class you'd be interested in teaching.</small>
                </div>
                <button type="submit" className="submit-app-button" disabled={loading}>
                    {loading ? 'Submitting...' : 'Submit Application'}
                </button>
            </form>
        </div>
    );
};

export default InstructorApplicationPage;