// client/src/pages/CheckoutPage.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import './CheckoutPage.css'; // Create this CSS file

const CheckoutPage = () => {
    const { classId } = useParams(); // Get classId from URL
    const { user } = useAuth();
    const navigate = useNavigate();
    const [classDetails, setClassDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [phoneNumber, setPhoneNumber] = useState(''); // For M-Pesa STK Push
    const [paymentStatus, setPaymentStatus] = useState(''); // e.g., 'processing', 'success', 'failed'

    useEffect(() => {
        if (!user) {
            // Optional: Redirect to login if user is not authenticated
            navigate('/signin?redirect=/checkout/' + classId);
            return;
        }

        const fetchClassDetails = async () => {
            try {
                // NOTE: You need a backend endpoint to fetch a single class by ID
                // For now, we'll assume you might have passed enough info or modify API
                // Let's simulate fetching or get it from a previous state if passed
                // For a real app, an API call: const response = await api.get(`/classes/${classId}`);
                // setClassDetails(response.data);

                // TEMPORARY: If you don't have a single class endpoint yet, this won't work.
                // This is a placeholder logic. You'll need to implement fetching class details.
                // For now, let's try to get all classes and filter. THIS IS INEFFICIENT.
                const allClassResponse = await api.get('/classes');
                const foundClass = allClassResponse.data.find(cls => cls._id === classId);
                if (foundClass) {
                    setClassDetails(foundClass);
                } else {
                    setError('Class not found.');
                }

            } catch (err) {
                console.error("Error fetching class details:", err);
                setError('Failed to load class details.');
            } finally {
                setLoading(false);
            }
        };

        if (classId) {
            fetchClassDetails();
        } else {
            setError('No class selected.');
            setLoading(false);
        }
    }, [classId, user, navigate]);

    const handleMpesaPayment = async () => {
        if (!classDetails) {
            setError('Class details not loaded.');
            return;
        }
        if (!phoneNumber || !/^(07|01)\d{8}$/.test(phoneNumber)) { // Basic Kenyan phone number validation
            setError('Please enter a valid M-Pesa phone number (e.g., 07XXXXXXXX or 01XXXXXXXX).');
            return;
        }

        setPaymentStatus('processing');
        setError('');

        try {
            // This API call will trigger the M-Pesa STK Push via your backend
            const response = await api.post('/payments/mpesa-stk-push', {
                classId: classDetails._id,
                amount: classDetails.price,
                phoneNumber: phoneNumber, // M-Pesa expects 254 format
                userId: user._id // Pass user ID for tracking
            });

            if (response.data.success) {
                // Backend successfully initiated STK Push
                setPaymentStatus('Waiting for M-Pesa PIN on your phone. We will update status once confirmed.');
                // Here you might start polling for payment status or use WebSocket
                // For simplicity, we'll just show a message.
                // A real app would likely poll an endpoint like /payments/status/:transactionId
            } else {
                setError(response.data.message || 'Failed to initiate M-Pesa payment.');
                setPaymentStatus('failed');
            }
        } catch (err) {
            console.error("M-Pesa payment error:", err);
            setError(err.response?.data?.message || 'An error occurred during M-Pesa payment initiation.');
            setPaymentStatus('failed');
        }
    };

    if (loading) return <div className="checkout-container"><p>Loading checkout...</p></div>;
    if (error && !classDetails) return <div className="checkout-container"><p className="error-message">{error}</p></div>; // If initial error prevents class loading
    if (!classDetails) return <div className="checkout-container"><p>No class details available.</p></div>; // Fallback if class not found after loading

    return (
        <div className="checkout-container page-wrapper-contained" style={{ paddingTop: '90px' }}> {/* Ensure page-wrapper-contained style for centering */}
            <h2>Checkout</h2>
            <div className="class-summary">
                <h3>Class: {classDetails.name}</h3>
                <p>Instructor: {classDetails.instructor}</p>
                <p className="price">Price: KES {classDetails.price}</p>
            </div>

            {user && (
                <div className="user-info">
                    <p>Logged in as: {user.name} ({user.email})</p>
                </div>
            )}

            <div className="payment-section">
                <h3>Pay with M-Pesa</h3>
                <div className="form-group">
                    <label htmlFor="phoneNumber">M-Pesa Phone Number (e.g., 0712345678):</label>
                    <input
                        type="tel"
                        id="phoneNumber"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="07XXXXXXXX or 01XXXXXXXX"
                    />
                </div>
                <button onClick={handleMpesaPayment} disabled={paymentStatus === 'processing' || paymentStatus === 'success'} className="mpesa-button">
                    {paymentStatus === 'processing' ? 'Processing...' : 'Pay KES ' + classDetails.price + ' with M-Pesa'}
                </button>
            </div>

            {paymentStatus && paymentStatus !== 'processing' && (
                 <div className={`payment-status-message ${paymentStatus}`}>
                     {paymentStatus === 'success' && 'Payment Successful! Check your email for confirmation.'}
                     {paymentStatus === 'failed' && 'Payment Failed. Please try again or contact support.'}
                     {paymentStatus === 'Waiting for M-Pesa PIN on your phone. We will update status once confirmed.' &&
                      'STK Push sent. Please enter your M-Pesa PIN on your phone. Refresh this page in a moment or check your bookings for confirmation.'}
                 </div>
             )}
             {/* Display any general error messages that are not just "Class not found" */}
             {error && classDetails && <p className="error-message" style={{ marginTop: '15px'}}>{error}</p>}
        </div>
    );
};

export default CheckoutPage;