// client/src/pages/ClassesPage.js
import React, { useState, useEffect } from 'react';
import api from '../services/api';
import ClassCard from '../components/ClassCard';
import './ClassesPage.css'; // Imports ClassesPage.css for styling this page and its elements

const ClassesPage = () => {
    const [classes, setClasses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchClasses = async () => {
            try {
                const response = await api.get('/classes');
                setClasses(response.data);
            } catch (err) {
                setError('Failed to load classes. Please try again later.');
                console.error("Error fetching classes:", err); // For debugging
            } finally {
                setLoading(false);
            }
        };
        fetchClasses();
    }, []); // Empty dependency array means this effect runs once after initial render

    if (loading) return <div style={{ textAlign: 'center', marginTop: '50px' }}><p>Loading classes...</p></div>;
    if (error) return <div style={{ textAlign: 'center', marginTop: '50px', color: '#cf6679' /* Or your theme's error color */ }}><p>{error}</p></div>;
    if (!loading && classes.length === 0 && !error) return <div style={{ textAlign: 'center', marginTop: '50px' }}><p>No classes available at the moment.</p></div>;

    return (
        <div className="classes-page"> {/* The root element for this page's content */}
            <h2>Our Classes</h2>
            <div className="classes-grid">
                {classes.map((cls, index) => (
                    // Wrapper div for each card for animation control
                    <div
                        key={cls._id} // Key on the wrapper for React's list rendering
                        className="class-card-animation-wrapper" // CSS class for animation
                        style={{ animationDelay: `${index * 0.1}s` }} // Inline style for staggered animation delay
                    >
                        <ClassCard classItem={cls} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ClassesPage;