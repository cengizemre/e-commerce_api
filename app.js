const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();
const userRoute = require('./routes/user');
const authRoute = require('./routes/authentication');
const productRoute = require('./routes/product');
const cartRoute = require('./routes/cart');
const orderRoute = require('./routes/order');
const stripeRoute = require("./routes/stripe");
app.use(express.json());

//database connect
mongoose.connect(process.env.MONGO_URL)
    .then(() => { console.log("db connected") })
    .catch((err) => {
        console.log("Error:" + err)
    });

//Routes
app.use('/api/', productRoute);
app.use('/api/', authRoute);
app.use('/api/', userRoute);
app.use('/api/', cartRoute);
app.use('/api/', orderRoute);
app.use('/api/', stripeRoute);
app.listen(process.env.PORT, (req, res) => {
    console.log(`server listening on ${process.env.PORT}`)
});