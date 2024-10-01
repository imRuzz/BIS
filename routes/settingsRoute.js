const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');

//Blotter Records Page
    router.get('/manageAccount', ensureAuthenticated,
    (req, res) => res.render('manageAccount', {
        name: req.user.name
    }));



module.exports = router;