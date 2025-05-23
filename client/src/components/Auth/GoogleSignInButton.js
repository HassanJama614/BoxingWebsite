import React from 'react';

// Simplified Google G SVG (You can use a more detailed one if preferred)
const GoogleIcon = () => (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: '12px' }}>
        <path d="M17.6401 9.20455C17.6401 8.56819 17.583 7.95455 17.4773 7.36364H9V10.8409H13.8409C13.6364 11.9545 12.9773 12.9091 12.0227 13.5114V15.8182H14.9545C16.6591 14.2045 17.6401 11.9091 17.6401 9.20455Z" fill="#4285F4"/>
        <path d="M9.00001 18C11.4318 18 13.4773 17.1932 14.9545 15.8182L12.0227 13.5114C11.2159 14.0114 10.2045 14.3636 9.00001 14.3636C6.61365 14.3636 4.61365 12.8068 3.9091 10.7045H0.85228V13.0909C2.32956 15.9886 5.38637 18 9.00001 18Z" fill="#34A853"/>
        <path d="M3.90908 10.7045C3.7159 10.1136 3.61363 9.48864 3.61363 8.84091C3.61363 8.19318 3.7159 7.56818 3.90908 6.97727V4.59091H0.852262C0.306807 5.72727 0 7.04545 0 8.84091C0 10.6364 0.306807 11.9545 0.852262 13.0909L3.90908 10.7045Z" fill="#FBBC05"/>
        <path d="M9.00001 3.63636C10.3068 3.63636 11.5227 4.09091 12.4773 4.97727L15.0114 2.44318C13.4773 0.931818 11.4318 0 9.00001 0C5.38637 0 2.32956 2.01136 0.85228 4.59091L3.9091 6.97727C4.61365 4.875 6.61365 3.63636 9.00001 3.63636Z" fill="#EA4335"/>
    </svg>
);


const GoogleSignInButton = () => {
    const handleGoogleSignInClick = () => {
        const googleAuthUrl = `${process.env.REACT_APP_API_URL || 'http://localhost:5001/api'}/auth/google`;
        window.open(googleAuthUrl, '_blank', 'width=500,height=600');
    };

    return (
        <button onClick={handleGoogleSignInClick} className="google-signin-button">
            <GoogleIcon /> {/* Use the SVG component */}
            Sign in with Google
        </button>
    );
};

export default GoogleSignInButton;