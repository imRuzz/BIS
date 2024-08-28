const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');

//Blotter Records Page
    router.get('/blotterRecords', ensureAuthenticated,
    (req, res) => res.render('blotterRecords', {
        name: req.user.name
    }));



module.exports = router;