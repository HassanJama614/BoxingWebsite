// client/src/components/Layout.js
import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';

const Layout = ({ children }) => {
    const location = useLocation();
    // Add other paths that should be full-width
    const fullWidthPaths = ['/', '/classes', '/checkout']; // Add more as needed, ensure classId is handled if /checkout/:classId
    const isFullWidthPage = fullWidthPaths.some(path => {
        if (path.includes(':')) { // Basic check for paths with params like /checkout/:classId
            const basePath = path.substring(0, path.indexOf('/:'));
            return location.pathname.startsWith(basePath);
        }
        return location.pathname === path;
    });


    const wrapperClassName = isFullWidthPage ? "page-wrapper-full-width" : "page-wrapper-contained";
    const wrapperStyle = isFullWidthPage ? {} : { paddingTop: '70px' }; // Full width pages handle their own top margin/padding

    return (
        <>
            <Navbar />
            <main className={wrapperClassName} style={wrapperStyle}>
                {children}
            </main>
        </>
    );
};

export default Layout;