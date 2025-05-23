const express = require('express');
const passport = require('passport');
const { registerUser, loginUser, getUserProfile, googleAuthCallback } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware'); 
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get(
    '/google/callback',
    passport.authenticate('google', { failureRedirect: '/login/failed', session: false }), 
    googleAuthCallback
);


router.get('/profile', protect, getUserProfile); 

router.get('/login/failed', (req, res) => {
    res.status(401).json({
      success: false,
      message: "failure",
    });
});





module.exports = router;