import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './HomePage.css'; // Import the HomePage CSS

const HomePage = () => {
    const { user } = useAuth();

    const buttonStyle = {
        display: 'inline-block',
        margin: '10px',
        padding: '12px 25px',
        backgroundColor: '#ffffff',
        color: '#121212',
        textDecoration: 'none',
        borderRadius: '8px',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
        border: 'none',
        transition: 'background-color 0.3s ease, box-shadow 0.2s ease',
        boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
    };
    // Hover for buttons needs to be handled by CSS classes or more complex state logic
    // if not using a styling library that supports pseudo-classes in JS.

    const primaryButtonStyle = {
        ...buttonStyle,
    };

   // client/src/pages/HomePage.js
// ... (imports, buttonStyle, etc.) ...

return (
    <div className="homepage-container"> {/* This is the full-screen flex parent */}
        <video autoPlay muted loop className="video-background">
            <source src="/videos/background-video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
        </video>
        <div className="video-overlay"></div>

        {/* This div will be centered by its parent (.homepage-container)
            AND it will center its own children (h1, p, buttons) */}
        <div className="homepage-content"> {/* <<< ONLY THIS CLASS NAME HERE */}
            <h1>Welcome to BOXINGLY</h1>
            <p>
                Your ultimate destination for elite boxing training. Unleash your potential.
            </p>
            <div className="button-container">
                <Link to="/classes" style={primaryButtonStyle} className="home-page-button">
                    View Classes
                </Link>
                {!user && (
                    <Link to="/signup" style={buttonStyle} className="home-page-button">
                        Join Now
                    </Link>
                )}
            </div>
        </div>
    </div>
);


};




export default HomePage;