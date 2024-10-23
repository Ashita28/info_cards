const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        match: [/.+\@.+\..+/, 'Please fill a valid email address'] // Added basic email validation
    },
    age: {
        type: Number
    }
}, { timestamps: true });

// Create model
const User = mongoose.model('User', userSchema); // Removed 'new' keyword

module.exports = User;
