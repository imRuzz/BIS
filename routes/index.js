const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');
const Resident = require('../models/Resident');

// Welcome Page
router.get('/', (req, res) => res.render('welcome'));

// Dashboard Page
router.get('/dashboard', ensureAuthenticated,
    (req, res) => res.render('dashboard', {
        name: req.user.name
    }));

//Resident Info Page
    router.get('/residentinfo', ensureAuthenticated,
    (req, res) => res.render('residentinfo', {
        name: req.user.name
    }));

// Resident Info Page (Display data)
router.get('/residentinfo', ensureAuthenticated, (req, res) => {
    Resident.find({})
        .then(residents => {
            res.render('residentinfo', { 
                residents: residents, 
                lname: req.user.lname
            });
        })
        .catch(err => {
            console.error("Something went wrong:", err);
            res.status(500).send("Error retrieving residents");
        });
});

// Insert Resident data into the database
router.post('/residentinfo', (req, res) => {
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

    newResident.save()
    .then(() => res.redirect('/residentinfo'))
    .catch(err => {
        console.error(err);
        res.status(500).send('Server Error');
    });
});

//Settings Page
    router.get('/settings', ensureAuthenticated,
    (req, res) => res.render('settings', {
        name: req.user.name
    }));

module.exports = router;