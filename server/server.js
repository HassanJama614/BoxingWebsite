const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const passport = require('passport');
const connectDB = require('./config/db');

const authRoutes = require('./routes/authRoutes');
const classRoutes = require('./routes/classRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const instructorApplicationRoutes = require('./routes/instructorApplicationRoutes');

require('./config/passport-setup');

dotenv.config();
connectDB();

const app = express();

// CORS Middleware
app.use(cors({
    // Be more specific for production if you know your frontend domains
    origin: [
        'http://localhost:3000', // Main site local dev
        'http://localhost:3001', // Staff dashboard local dev
        'https://your-main-site.vercel.app', // Your DEPLOYED main site URL
        'https://your-staff-dashboard.vercel.app' // Your DEPLOYED staff dashboard URL
    ],
    credentials: true
}));

// Body Parser & Passport Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());

// Mount Routers
app.use('/api/auth', authRoutes);
app.use('/api/classes', classRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/instructor-applications', instructorApplicationRoutes);

// Simple root endpoint to confirm API is running
app.get('/', (req, res) => {
    res.send('Boxing API is alive!');
});

// ==========================================================
// === REMOVE OR COMMENT OUT THE app.listen() BLOCK BELOW ===
// ==========================================================


const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});


// ====================================================
// === ADD THIS LINE TO EXPORT THE APP FOR VERCEL ===
// ====================================================
module.exports = app;