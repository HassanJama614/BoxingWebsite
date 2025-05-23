// client/src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout'; // Import the new Layout
import HomePage from './pages/HomePage';
import ClassesPage from './pages/ClassesPage';
import ContactPage from './pages/ContactPage';
import SignUpPage from './pages/SignUpPage';
import SignInPage from './pages/SignInPage';
import CheckoutPage from './pages/CheckoutPage'; // Import CheckoutPage

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/classes" element={<ClassesPage />} />
          <Route path="/checkout/:classId" element={<CheckoutPage />} /> {/* Add checkout route */}
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/signin" element={<SignInPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}
export default App;
