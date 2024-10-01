const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');

//Resident model
const Resident = require('../models/resident');

// Resident Info Page - Fetch and display all resident data
router.get('/residentinfo', ensureAuthenticated, async (req, res) => {
    try {
        const residents = await Resident.find(); // Fetch all residents
        res.render('residentinfo', {
            name: req.user.name,
            list: residents // Pass the data to the EJS template
        });
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
});

// Insert Resident data into the database
router.post('/addResident', ensureAuthenticated, async (req, res) => {
    try {
        const { firstName, lastName, age, dob, placeOfBirth, yearsOfResidency, civilStatus, position, sex, natureOfwork, education, companyName, voterStatus } = req.body;

        const newResident = new Resident({
            fname: firstName,
            lname: lastName,
            age,
            dob,
            placeOfBirth,
            yearsOfResidency,
            civilStatus,
            position,
            sex,
            natureOfwork,
            education,
            companyName,
            voterStatus,
        });

        await newResident.save(); // Save the new resident
        res.redirect('/residentData/residentinfo'); // Redirect after successful save

    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
});


module.exports = router;