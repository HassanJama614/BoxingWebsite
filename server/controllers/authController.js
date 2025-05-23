const User = require('./models/User');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};


exports.registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const user = await User.create({ name, email, password });

        if (user) {
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id),
            });
        } else {
            res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};


exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });

        if (user && (await user.matchPassword(password))) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id),
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};


exports.getUserProfile = async (req, res) => {
   
    if (req.user) {
        res.json({
            _id: req.user._id,
            name: req.user.name,
            email: req.user.email,
            googleId: req.user.googleId,
        });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
};


exports.googleAuthCallback = (req, res) => {
   
    const token = generateToken(req.user._id);

    
    res.status(200).send(`
        <script>
            window.opener.postMessage({
                type: 'AUTH_SUCCESS',
                payload: {
                    token: '${token}',
                    user: { _id: '${req.user._id}', name: '${req.user.name}', email: '${req.user.email}' }
                }
            }, '*'); // Be more specific with targetOrigin in production
            window.close();
        </script>
    `);
};