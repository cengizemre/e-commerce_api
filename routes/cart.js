const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');
const { verifyToken, verifyTokenAndAdmin, verifyTokenAndAutherization } = require('./verifyToken');


// CREATE
router.post('/cart/new', verifyToken, async (req, res) => {

    const newCart = await new Card(req.body);
    try {
        const savedCart = await newCart.save();
        res.status(200).json(savedCart);
    } catch (err) {
        res.status(500).json(err);
    }
});

// GET ALL
router.get("/carts", verifyTokenAndAdmin, async (req, res) => {
    try {
        const carts = await Cart.find();
        res.status(200).json(carts);
    } catch (err) {
        res.status(500).json(err);
    }
});

// GET USER CARD
router.get('/cart/find/:userId', verifyTokenAndAutherization, async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.params.userId });
        res.status(200).json(cart);
    } catch (err) {
        res.status(500).json(err);
    }
})


// UPDATE
router.put('/cart/edit/:id', verifyTokenAndAutherization, async (req, res) => {
    try {
        const updatedCart = await Cart.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body
            },
            { new: true }
        );
        res.status(200).json(updatedCart);
    } catch (err) {
        res.status(500).json(err);
    }
});

// DELETE
router.delete('/cart/delete/:id', verifyTokenAndAutherization, async (req, res) => {
    try {
        await Cart.findByIdAndDelete(req.params.id);
        res.status(200).json("Sepet silindi");
    } catch (err) {
        res.status(500).json(err);
    }
})



module.exports = router;