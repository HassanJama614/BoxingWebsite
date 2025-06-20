// client/src/contexts/AuthContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../services/api'; // Your Axios instance

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // To track initial user load

    useEffect(() => {
        const loadUserFromToken = async () => {
            const token = localStorage.getItem('authToken');
            if (token) {
                api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                try {
                    // Fetch full user profile including new fields
                    const response = await api.get('/auth/profile');
                    setUser(response.data); // This should now include username, profilePictureUrl, bio
                } catch (error) {
                    console.error("AuthContext: Failed to load user from token", error);
                    localStorage.removeItem('authToken');
                    delete api.defaults.headers.common['Authorization'];
                    setUser(null); // Clear user on error
                }
            }
            setLoading(false);
        };
        loadUserFromToken();
    }, []);

    const login = (userData, token) => {
        localStorage.setItem('authToken', token);
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        // userData from login/register should now include username, profilePictureUrl, bio
        setUser(userData);
    };

    const logout = () => {
        localStorage.removeItem('authToken');
        delete api.defaults.headers.common['Authorization'];
        setUser(null);
        // Consider navigating to home or login page after logout:
        // window.location.href = '/signin'; // Or use useNavigate if context has router access
    };

    useEffect(() => {
        const handleAuthMessage = (event) => {
            if (event.origin !== (process.env.REACT_APP_API_URL || 'http://localhost:5001').match(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/i)[0] && event.origin !== window.location.origin) {
                 console.warn("Message received from untrusted origin:", event.origin);
                 // return; // In production, be strict with origin check for security
            }

            if (event.data && event.data.type === 'GOOGLE_AUTH_SUCCESS') {
                const { token, user: googleUser } = event.data.payload;
                // googleUser from backend should already contain profilePictureUrl (from Google)
                // and defaults for username/bio
                login(googleUser, token);
            }
        };

        window.addEventListener('message', handleAuthMessage);
        return () => {
            window.removeEventListener('message', handleAuthMessage);
        };
    }, []); // Added empty dependency array to ensure this effect runs once

    return (
        <AuthContext.Provider value={{ user, setUser, login, logout, loading }}>
            {!loading && children} {/* Render children only after initial loading attempt */}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
