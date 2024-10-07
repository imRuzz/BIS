const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const crypto = require('crypto');
const nodemailer = require('nodemailer'); // Use nodemailer to send emails

// Request Password Reset
router.post('/forgot-password', async (req, res) => {
    const { email } = req.body;
    
    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).json({ success: false, message: 'User with this email does not exist' });
    }

    // Generate a token and set its expiration time
    const token = crypto.randomBytes(32).toString('hex');
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

    await user.save();

    // Send email with the reset link
    const transporter = nodemailer.createTransport({
        // Configure your email service
        service: 'Gmail',
        auth: {
            user: 'your-email@gmail.com',
            pass: 'your-email-password',
        },
    });

    const resetUrl = `http://localhost:3000/users/reset-password/${token}`;
    const mailOptions = {
        to: user.email,
        subject: 'Password Reset',
        text: `You are receiving this email because you (or someone else) have requested the reset of the password for your account.\n\n
                Please click on the following link, or paste this into your browser to complete the process:\n\n
                ${resetUrl}\n\n
                If you did not request this, please ignore this email and your password will remain unchanged.\n`
    };

    transporter.sendMail(mailOptions, (err) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Error sending email' });
        }
        res.json({ success: true, message: 'Reset link sent to your email' });
    });
});

// Reset Password Page
router.get('/reset-password/:token', async (req, res) => {
    const { token } = req.params;

    // Find the user with the token and check if it is expired
    const user = await User.findOne({ resetPasswordToken: token, resetPasswordExpires: { $gt: Date.now() } });
    if (!user) {
        return res.status(400).json({ success: false, message: 'Password reset token is invalid or has expired' });
    }

    // Render a password reset form (you can create a resetPassword.ejs view)
    res.render('resetPassword', { token });
});

// Update Password
router.post('/reset-password/:token', async (req, res) => {
    const { token } = req.params;
    const { newPassword, confirmPassword } = req.body;

    // Check if new password and confirmation match
    if (newPassword !== confirmPassword) {
        return res.status(400).json({ success: false, message: 'New password and confirmation do not match' });
    }

    // Find the user with the token and check if it is expired
    const user = await User.findOne({ resetPasswordToken: token, resetPasswordExpires: { $gt: Date.now() } });
    if (!user) {
        return res.status(400).json({ success: false, message: 'Password reset token is invalid or has expired' });
    }

    // Hash new password
    user.password = await bcrypt.hash(newPassword, 10);
    user.resetPasswordToken = undefined; // Clear token
    user.resetPasswordExpires = undefined; // Clear expiration
    await user.save();

    res.json({ success: true, message: 'Password has been reset successfully' });
});

module.exports = router;
