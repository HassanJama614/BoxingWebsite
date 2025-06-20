// client/src/components/Disclaimer.js
import React from 'react';
import './Disclaimer.css'; // We'll create this CSS file

const Disclaimer = ({ onAccept }) => {
    const handleAccept = () => {
        localStorage.setItem('disclaimerAccepted', 'true'); // Mark as accepted
        onAccept(); // Call the function passed from App.js to hide the disclaimer
    };

    return (
        <div className="disclaimer-overlay">
            <div className="disclaimer-content">
                <h1>Warning</h1>
                <p>This website may contain content with bright or flashing lights.</p>
                <p>Viewer discretion is advised, especially for individuals sensitive to such effects.</p>
                <button onClick={handleAccept} className="disclaimer-accept-button">
                    Accept & Continue
                </button>
            </div>
        </div>
    );
};

export default Disclaimer;