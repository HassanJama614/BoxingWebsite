// client/src/components/Layout.js (New File)
import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';

const Layout = ({ children }) => {
    const location = useLocation();
    const isHomePage = location.pathname === '/';

    // Determine the wrapper class based on the route
    const wrapperClassName = isHomePage ? "page-wrapper-full-width" : "container page-wrapper-contained";
    const wrapperStyle = isHomePage ? { paddingTop: '0px' } : { paddingTop: '70px' }; // HomePage manages its own top margin

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