const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: false, // Not required for Google Sign-in initially
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+\@.+\..+/, 'Please fill a valid email address'],
    },
    password: {
        type: String,
        required: function() { return !this.googleId; } // Required if not a Google sign-in
    },
    googleId: {
        type: String,
        unique: true,
        sparse: true // Allows multiple nulls, but googleId must be unique if present
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Hash password before saving for traditional signup
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password') || !this.password) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Method to compare password for login
UserSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);