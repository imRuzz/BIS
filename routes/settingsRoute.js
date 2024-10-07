const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');

//Manage Account Page
    router.get('/manageAccount', ensureAuthenticated,
    (req, res) => res.render('manageAccount', {
        name: req.user.name
    }));

//Manage Account Page
    router.get('/changepassword', ensureAuthenticated,
    (req, res) => res.render('changepassword', {
        name: req.user.name
    }));



module.exports = router;