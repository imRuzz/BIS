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

//Add Resident Page
    router.get('/addResident', ensureAuthenticated,
    (req, res) => res.render('addResident', {
        name: req.user.name
    }));

// Insert Resident data into the database
// router.post('/addResident', upload.none(), (req, res) => {
//     const newResident = new Resident({
//         name: req.body.name,
//         fname: req.body.fname,
//         lname: req.body.lname,
//         age: req.body.age,
//         status: req.body.status,
//         sex: req.body.sex,
//         contact: req.body.contact,
//     });

//     newResident.save((err) => {
//         if (err) {
//             res.json({ message: err.message, type: "danger" });
//         } else {
//             req.session.message = {
//                 type: "success",
//                 message: "Resident added successfully!",
//             };
//             res.redirect("/");
//         }
//     });
// });

//Settings Page
    router.get('/settings', ensureAuthenticated,
    (req, res) => res.render('settings', {
        name: req.user.name
    }));

module.exports = router;