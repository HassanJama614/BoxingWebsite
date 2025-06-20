// client/src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import ClassesPage from './pages/ClassesPage';
import CheckoutPage from './pages/CheckoutPage';
// import ContactPage from './pages/ContactPage'; // REMOVE OLD CONTACT PAGE IMPORT
import InstructorApplicationPage from './pages/InstructorApplicationPage'; // IMPORT NEW PAGE
import SignUpPage from './pages/SignUpPage';
import SignInPage from './pages/SignInPage';
import ProfileSettingsPage from './pages/ProfileSettingsPage';
import Disclaimer from './components/Disclaimer';

function App() {
  const [showDisclaimer, setShowDisclaimer] = useState(false);

  useEffect(() => {
    const disclaimerAccepted = localStorage.getItem('disclaimerAccepted');
    if (disclaimerAccepted !== 'true') {
      setShowDisclaimer(true);
    }
  }, []);

  const handleAcceptDisclaimer = () => {
    setShowDisclaimer(false);
  };

  if (showDisclaimer) {
    return <Disclaimer onAccept={handleAcceptDisclaimer} />;
  }

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/classes" element={<ClassesPage />} />
          <Route path="/checkout/:classId" element={<CheckoutPage />} />
          <Route path="/profile-settings" element={<ProfileSettingsPage />} />
          {/* <Route path="/contact" element={<ContactPage />} /> REMOVE OLD CONTACT ROUTE */}
          <Route path="/instructor-apply" element={<InstructorApplicationPage />} /> {/* ADD NEW ROUTE */}
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/signin" element={<SignInPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
