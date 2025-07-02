// client/src/components/Navbar.js
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import "./Navbar.css";

// SVG Icons
const ClassesIcon = () => (
  /* ... SVG code ... */ <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="nav-icon"
  >
    <rect x="3" y="3" width="7" height="7"></rect>
    <rect x="14" y="3" width="7" height="7"></rect>
    <rect x="3" y="14" width="7" height="7"></rect>
    <rect x="14" y="14" width="7" height="7"></rect>
  </svg>
);
// Using a "Briefcase" or "Users" icon for "Teach With Us" might be more appropriate
const TeachIcon = () => (
  /* Example: Briefcase icon */ <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="nav-icon"
  >
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
  </svg>
);
const LogoutIcon = () => (
  /* ... SVG code ... */ <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="nav-icon"
  >
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
    <polyline points="16 17 21 12 16 7"></polyline>
    <line x1="21" y1="12" x2="9" y2="12"></line>
  </svg>
);

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const displayName =
    user?.username ||
    user?.name ||
    (user?.email ? user.email.split("@")[0] : "User");

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
          {/* UPDATED LINK AND TEXT */}
          <Link to="/instructor-apply" className="nav-link-item">
            <TeachIcon /> {/* Using a new example icon */}
            <span>Teach With Us</span>
          </Link>
        </li>
        {user ? (
          <>
            <li>
              <span className="user-welcome">Welcome, {displayName}</span>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="nav-link-item logout-button"
              >
                <LogoutIcon />
                <span>Logout</span>
              </button>
            </li>
            <li className="profile-icon-item">
              <Link
                to="/profile-settings"
                className="profile-icon-link"
                title="Profile Settings"
              >
                <img
                  src={user.profilePictureUrl || "/images/default-avatar.png"}
                  alt={displayName}
                  className="navbar-profile-pic"
                />
              </Link>
            </li>
            <li className="profile-icon-item">
              <a href="http://localhost:3001">
                <button>Staff Dashboard</button>
              </a>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/signup" className="nav-button">
                Sign Up
              </Link>
            </li>
            <li>
              <Link to="/signin" className="nav-button">
                Sign In
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
