const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');

//Resident model
const Resident = require('../models/resident');

router.get('/certificates/profile', (req, res) => res.render('profile'));

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
        const { firstName, lastName, suffix, age, dob, placeOfBirth, yearsOfResidency, civilStatus, citizenship, religion, sex, occupation, education, companyName, contact, voterStatus } = req.body;

        const newResident = new Resident({
            fname: firstName,
            lname: lastName,
            suffix,
            age,
            dob,
            placeOfBirth,
            yearsOfResidency,
            civilStatus,
            citizenship,
            religion,
            sex,
            occupation,
            education,
            companyName,
            contact,
            voterStatus,
        });

        await newResident.save(); // Save the new resident
        res.redirect('/residentData/residentinfo'); // Redirect after successful save

    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
});


// Fetch and display resident profile
router.get('/profile/:id', ensureAuthenticated, async (req, res) => {
    try {
        const resident = await Resident.findById(req.params.id); // Fetch resident by ID
        if (!resident) {
            return res.status(404).send("Resident not found");
        }
        res.render('certificates/profile', {
            resident // Pass the resident data to the EJS template
        });
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
});



module.exports = router;