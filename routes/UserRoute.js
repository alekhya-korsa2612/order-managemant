const express = require('express');
const UserModel = require('../models/UserModel');
const bcrypt = require('bcrypt');
const router = express.Router();
const otp = Math.floor(100000 + Math.random() * 90000);
const jwt = require('jsonwebtoken');
const authenticate = require('../middleware/authenticate');

router.post('/register', async (req, res) => {
    try {
        const { firstname, lastname, email, password, confirmpassword, mobileNumber, address } = req.body;
 
        if (password !== confirmpassword) {
            return res.status(400).json({ success: false, message: 'Password and confirm password do not match' });
        }
 
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'Email already exists' });
        }
 
        const hashedPassword = await bcrypt.hash(password, 10);
 
        const user = new UserModel({
            firstname,
            lastname,
            email,
            passwordHash: hashedPassword,
            confirmpasswordHash: hashedPassword, 
            mobileNumber,
            address,
            otp
           
           
        });

        await user.save();
 
        res.json({ success: true, message: 'Account created successfully' });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ success: false, message: 'Registration failed' });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
 
        const user = await UserModel.findOne({ email });
 
        if (!user) {
            return res.status(400).json({ success: false, message: 'Invalid email or password' });
        }
 
        const isPasswordMatch = await bcrypt.compare(password, user.passwordHash);
        if (!isPasswordMatch) {
            return res.status(400).json({ success: false, message: 'Invalid email or password' });
        }
        console.log('Login successful');
        const payload = {
            userId: user._id
        };
        
        const token = jwt.sign(payload, "webBatch", { expiresIn: '3h' });
 
        res.json({ success: true,token: token, message: 'Login successful', token });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ success: false, message: 'Login failed' });
    }
});

router.post('/verify-otp', async (req, res) => {
    try {
        const { email, otp } = req.body;
 
        const user = await UserModel.findOne({ email });
 
        if (!user || user.otp !== otp) {
            return res.status(400).json({ success: false, message: 'Invalid OTP' });
        }
 
        res.json({ success: true, message: 'OTP verification successful' });
    } catch (error) {
        console.error('OTP verification error:', error);
        res.status(500).json({ success: false, message: 'OTP verification failed' });
    }
});

router.get('/users', authenticate, (req, res) => {
    const userId = req.userData.userId;
    UserModel.findById(userId)
        .then(result => {
            res.json({ success: true, data: result });
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ success: false, message: "Server error" });
        });
});
router.get('/success', async (req, res) => {
    try {
        const users = await UserModel.find({});
        res.status(200).json({ success: true, data: users, message: 'Successfully fetched users' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: err.message });
    }
});
 
module.exports = router;