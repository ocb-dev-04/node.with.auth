const mongoose = require('mongoose');

module.exports = mongoose.model(
    'User',
    new mongoose.Schema({
        name: {
            type: String,
            reqquired: true,
            max: 255,
            min: 6
        },
        email: {
            type: String,
            required: true,
            max: 255,
            min: 6
        },
        password: {
            type: String,
            required: true,
            max: 1024,
            min: 6
        },
        date: {
            type: Date,
            default: Date.now
        }
    })
);