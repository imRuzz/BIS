const mongoose = require('mongoose');

const ResidentSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: true,
    },
    lname: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    dob: {
        type: Date,
        required: true,
    },
    placeOfBirth: {
        type: String,
        required: true,
    },
    yearsOfResidency: {
        type: Number,
        required: true,
    },
    civilStatus: {
        type: String,
        required: true,
    },
    position: {
        type: String,
        required: true,
    },
    sex: {
        type: String,
        required: true,
    },
    natureOfwork: {
        type: String,
        required: true,
    },
    education: {
        type: String,
        required: true,
    },
    companyName: {
        type: String,
        required: true,
    },
    voterStatus: {
        type: String,
        required: true,
    }
});

const Resident = mongoose.model('Resident', ResidentSchema);
module.exports = Resident;
