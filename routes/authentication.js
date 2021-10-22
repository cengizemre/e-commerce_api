const express = require('express');
const router = express.Router();
const User = require('../models/User');

//REGISTER
router.post('/register', async (req, res) => {
    const { username, password, email } = req.body;
    const newUser = new User({
        username,
        password,
        email
    });
    try {
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;