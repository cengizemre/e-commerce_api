const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    products: [
        {
            productId: {
                type: String
            },
            quantity: {
                type: Number,
                default: 1
            }
        }
    ],
    amount: { type: String, required: true },
    adress: { type: String, required: true },
    status: { type: String, defalut: 'gönderiliyor' }
},
    { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);