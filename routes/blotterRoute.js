const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');
const Blotter = require('../models/blotter');

// Blotter Records Page - GET request
router.get('/blotterRecords', ensureAuthenticated, async (req, res) => {
    try {
        // Fetch all blotter records from the database
        const blotterRecords = await Blotter.find();

        // Prepare the response object
        const responseData = {
            name: req.user.name,
            recs: blotterRecords  // Pass the fetched records to the view
        };

        // Render the page with the records
        res.render('blotterRecords', responseData);
    } catch (error) {
        console.error("Error fetching blotter records:", error);
        res.status(500).send('Server Error');
    }
});

// Add Blotter Record - POST request
router.post('/addBlotter', ensureAuthenticated, async (req, res) => {
    const { time, date, address, complainant, respondent, status } = req.body;

    // Check if all fields are provided
    if (!time || !date || !address || !complainant || !respondent || !status) {
        return res.status(400).json({ message: 'Please fill in all fields' });
    }

    try {
        const newBlotter = new Blotter({
            time,
            date,
            address,
            complainant,
            respondent,
            status
        });

        // Save the new blotter record
        await newBlotter.save();

        // Optionally, set a success message here
        // req.flash('success_msg', 'Blotter record added successfully');

        res.redirect('/blotterRoute/blotterRecords');
    } catch (error) {
        console.error("Error adding blotter record:", error);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
