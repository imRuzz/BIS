const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');


//Resident model
const Resident = require('../models/resident');

//Resident Info Page
    router.get('/residentinfo', ensureAuthenticated,
    (req, res) => res.render('residentinfo', {
        name: req.user.name
    }));


// Insert Resident data into the database
router.post('/addResident', async (req, res, next) => {
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

// Fetch and display all resident data
router.get('/residentinfo', async (req, res) => {
    res.render('residentinfo', {user: 'Russel'})
});


module.exports = router;