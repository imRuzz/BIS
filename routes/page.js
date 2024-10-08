const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');

// Welcome Page
router.get('/', (req, res) => res.render('welcome'));

// Dashboard Page
router.get('/dashboard', ensureAuthenticated,
    (req, res) => res.render('dashboard', {
        name: req.user.name
    }));

//Settings Page
    router.get('/settings', ensureAuthenticated,
    (req, res) => res.render('settings', {
        name: req.user.name
    }));

module.exports = router;