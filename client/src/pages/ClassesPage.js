// client/src/pages/ClassesPage.js (Should be like this)
import React, { useState, useEffect } from 'react';
import api from '../services/api';
import ClassCard from '../components/ClassCard';
import './ClassesPage.css';

const ClassesPage = () => {
    const [classes, setClasses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        // ... fetchClasses logic ...
        const fetchClasses = async () => {
            try {
                const response = await api.get('/classes');
                setClasses(response.data);
            } catch (err) {
                setError('Failed to load classes. Please try again later.');
                console.error("Error fetching classes:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchClasses();
    }, []);

    if (loading) return <div style={{ textAlign: 'center', marginTop: '50px' }}><p>Loading classes...</p></div>;
    // ... error and no classes rendering ...

    return (
        <div className="classes-page"> {/* Main page container */}
            <h2>Our Classes</h2>
            <div className="classes-grid"> {/* Grid container inside */}
                {classes.map((cls, index) => (
                    <div
                        key={cls._id}
                        className="class-card-animation-wrapper"
                        style={{ animationDelay: `${index * 0.1}s` }}
                    >
                        <ClassCard classItem={cls} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ClassesPage;