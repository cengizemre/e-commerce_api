const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { verifyTokenAndAutherization, verifyTokenAndAdmin } = require('./verifyToken');

//GET USER
router.get('/user/find/:id', verifyTokenAndAdmin, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const { password, ...others } = user._doc;
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err);
    }
})

//GET ALL USER
router.get('/users', verifyTokenAndAdmin, async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json(err);
    }
})

//GET USER STATS
router.get('/user/stats', verifyTokenAndAdmin, async (req, res) => {
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
    try {
        const data = await User.aggregate([
            { $match: { createdAt: { $gte: lastYear } } },
            {
                $project: {
                    month: { $month: "$createdAt" },
                }
            },
            {
                $group: {
                    _id: "$month",
                    total: { $sum: 1 },
                }
            },
        ]);
        res.status(200).json(data)
    } catch (err) {
        res.status(500).json(err);
    }
});

// UPDATE USER
router.put('/user/edit/:id', verifyTokenAndAutherization, async (req, res) => {
    if (req.body.password) {
        req.body.password = CryptoJS.AES.encrypt(req.body.password, "Secret user-pass").toString();
    }
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true });
        res.status(200).json(updatedUser);
    } catch (err) {
        res.status(500).json(err);
    }
})

// DELETE USER
router.delete('/user/delete/:id', verifyTokenAndAutherization, async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("User deleted!");
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router;