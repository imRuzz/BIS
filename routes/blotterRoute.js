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

    // Normalize the status to lowercase
    const normalizedStatus = status ? status.toLowerCase() : 'active'; // Default to 'active' if status is not provided

    // Check if all fields are provided
    if (!time || !date || !address || !complainant || !respondent || !normalizedStatus) {
        return res.status(400).json({ message: 'Please fill in all fields' });
    }

    try {
        const newBlotter = new Blotter({
            time,
            date: new Date(date),  // Convert to Date object
            address,
            complainant,
            respondent,
            status: normalizedStatus  // Use normalized status
        });

        // Save the new blotter record
        await newBlotter.save();

        res.redirect('/blotterRoute/blotterRecords');
    } catch (error) {
        console.error("Error adding blotter record:", error.message);
        res.status(500).send('Server Error');
    }
});


// Edit Blotter Route
router.post('/editBlotter', async (req, res) => {
    try {
        const { _id, time, date, address, complainant, respondent, status } = req.body;

        // Find the blotter record by ID and update it
        const updatedRecord = await Blotter.findByIdAndUpdate(
            _id,
            {
                time,
                date,
                address,
                complainant,
                respondent,
                status,
            },
            { new: true } // Return the updated document
        );

        if (updatedRecord) {
            res.redirect('/blotterRoute/blotterRecords');
        } else {
            res.status(404).json({ message: 'Blotter record not found!' });
        }
    } catch (error) {
        console.error('Error updating blotter record:', error);
        res.status(500).json({ message: 'Server error', error });
    }
});


module.exports = router;
