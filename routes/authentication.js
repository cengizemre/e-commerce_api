const express = require('express');
const router = express.Router();
const User = require('../models/User');
const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');


//REGISTER
router.post('/register', async (req, res) => {
    const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password, "Secret user-pass").toString()
    });
    try {
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (err) {
        res.status(500).json(err);
    }
});
//LOGIN

router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        !user && res.status(401).json("Hatalı giriş e-mail veya şifre hatalı!");
        const hashPass = CryptoJS.AES.decrypt(user.password, "Secret user-pass");
        const OriginalPassword = hashPass.toString(CryptoJS.enc.Utf8);
        OriginalPassword !== req.body.password && res.status(401).json("Hatalı giriş e-mail veya şifre hatalı!");

        const accesToken = jwt.sign({
            id: user._id,
            isAdmin: user.isAdmin
        },
            process.env.JWT_SECRET,
            { expiresIn: "90d" }
        )

        const { password, ...others } = user._doc;

        res.status(200).json({ ...others, accesToken });
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router;