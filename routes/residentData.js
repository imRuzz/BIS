const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');


//Resident model
const Resident = require('../models/Resident');


//Resident Info Page
    router.get('/residentinfo', ensureAuthenticated,
    (req, res) => res.render('residentinfo', {
        name: req.user.name
    }));

// Resident Info Page (Display data)
router.get('/residentinfo', ensureAuthenticated, async (req, res) => {
    try {
        // Fetch all residents from the database
        const residents = await Resident.find({});
        res.render('residentinfo', {
            name: req.user.name,
            residents: residents // Pass the fetched residents to the EJS template
        });
    } catch (err) {
        console.error('Error fetching residents:', err);
        res.status(500).send('Server Error');
    }
});


// Insert Resident data into the database
router.post('/residentinfo', async (req, res) => {
    try {
        const newResident = new Resident({
            fname: req.body.firstName,
            lname: req.body.lastName,
            age: req.body.age,
            dob: req.body.dob,
            placeOfBirth: req.body.placeOfBirth,
            yearsOfResidency: req.body.yearsOfResidency,
            civilStatus: req.body.civilStatus,
            position: req.body.position,
            sex: req.body.sex,
            natureOfwork: req.body.natureOfwork,
            education: req.body.education,
            companyName: req.body.companyName,
            voterStatus: req.body.voterStatus,
        });
        await newResident.save();
        res.redirect('/residentData/residentinfo');
    } catch (err) {
        console.error('Error saving resident:', err);
        res.status(500).send('Server Error');
    }
});


module.exports = router;