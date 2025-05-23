// server/server.js
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const passport = require('passport');
const connectDB = require('./config/db');


const authRoutes = require('./routes/authRoutes');
const classRoutes = require('./routes/classRoutes');
const paymentRoutes = require('./routes/paymentRoutes');

require('./config/passport-setup'); 

dotenv.config();
connectDB();     

const app = express();


app.use(cors({
    origin: 'http://localhost:3000', 
    credentials: true
}));


app.use(express.json()); 
app.use(express.urlencoded({ extended: false })); 

// Passport Middleware
app.use(passport.initialize());



app.use('/api/auth', authRoutes);
app.use('/api/classes', classRoutes);
app.use('/api/payments', paymentRoutes);


app.get('/', (req, res) => res.send('Boxing API base is running'));


const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
    
});