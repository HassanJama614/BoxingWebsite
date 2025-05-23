const mongoose = require('mongoose');

const ClassSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a class name'],
        trim: true,
    },
    description: {
        type: String,
        required: [true, 'Please add a description'],
    },
    price: {
        type: Number,
        required: [true, 'Please add a price'],
    },
    imageUrl: {
        type: String, 
        required: [true, 'Please add an image URL'],
    },
    instructor: {
        type: String, 
        required: [true, 'Please assign an instructor'],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Class', ClassSchema);