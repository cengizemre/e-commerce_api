const express = require('express');
const app = express();
const mongoose = require('mongoose');
const userRoute = require('./routes/user');
const authRoute = require('./routes/authentication');
const productRoute = require('./routes/product');
const cartRoute = require('./routes/cart');
const orderRoute = require('./routes/order');
const stripeRoute = require("./routes/stripe");
require('dotenv').config();
app.use(express.json());

mongoose.connect(process.env.MONGO_URL)
    .then(() => { console.log(`DB connected : ${process.env.MONGO_URL}`) })
    .catch((err) => {
        console.log("Error:" + err)
    });

// ROUTES
app.use('/api/', productRoute);
app.use('/api/', authRoute);
app.use('/api/', userRoute);
app.use('/api/', cartRoute);
app.use('/api/', orderRoute);
app.use('/api/', stripeRoute);

app.listen(process.env.PORT, (req, res) => {
    console.log(`server listening on ${process.env.PORT}`)
});