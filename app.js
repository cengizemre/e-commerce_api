const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoute = require('./routes/user');
dotenv.config();

mongoose.connect(process.env.MONGO_URL)
    .then(() => { console.log("db connected") })
    .catch((err) => {
        console.log("Error:" + err)
    });

//Routes
app.use('/api/', userRoute);


app.listen(process.env.PORT, (req, res) => {
    console.log('5000 listening')
})


