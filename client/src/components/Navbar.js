import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './Navbar.css'; // Your existing Navbar.css

// SVG Icons as React Components
const ClassesIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="nav-icon"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect></svg>
);

const ContactIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="nav-icon"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
);

const LogoutIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="nav-icon"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
);


const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <Link to="/">BOXINGLY</Link>
            </div>
            <ul className="navbar-links">
                <li>
                    <Link to="/classes" className="nav-link-item">
                        <ClassesIcon />
                        <span>Classes</span>
                    </Link>
                </li>
                <li>
                    <Link to="/contact" className="nav-link-item">
                        <ContactIcon />
                        <span>Contact</span>
                    </Link>
                </li>
                {user ? (
                    <>
                        <li><span className="user-welcome">Welcome, {user.name || user.email}</span></li>
                        <li>
                            {/* Styled to look like a link */}
                            <button
                                onClick={handleLogout}
                                className="nav-link-item"
                                style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontFamily: 'inherit', fontSize: '1rem', color: '#e0e0e0' }}
                                onMouseEnter={e => e.currentTarget.style.color = '#ffffff'}
                                onMouseLeave={e => e.currentTarget.style.color = '#e0e0e0'}
                            >
                                <LogoutIcon />
                                <span>Logout</span>
                            </button>
                        </li>
                    </>
                ) : (
                    <>
                        <li><Link to="/signup" className="nav-button">Sign Up</Link></li>
                        <li><Link to="/signin" className="nav-button">Sign In</Link></li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;