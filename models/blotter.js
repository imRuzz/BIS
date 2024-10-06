const mongoose = require('mongoose');

const blotterSchema = new mongoose.Schema({
    time: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    complainant: {
        type: String,
        required: true
    },
    respondent: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['active', 'settled', 'scheduled'],  // Status options
        default: 'active'  // Default value
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});


const Blotter = mongoose.model('Blotter', blotterSchema);
module.exports = Blotter;