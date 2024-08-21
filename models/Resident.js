const mongoose = require('mongoose');
const ResidentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    fname: {
        type: String,
        required: true,
    },
    lname: {
        type: String,
        required: true,
    },
    age: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    sex: {
        type: String,
        required: true,
    },
    contact: {
        type: String,
        required: true,
    },
    action: String,
})

const Resident = mongoose.model('Resident', ResidentSchema);
module.exports = Resident;