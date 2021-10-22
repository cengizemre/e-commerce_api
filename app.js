const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoute = require('./routes/user');
const authRoute = require('./routes/authentication')
dotenv.config();
app.use(express.json());

//database connect
mongoose.connect(process.env.MONGO_URL)
    .then(() => { console.log("db connected") })
    .catch((err) => {
        console.log("Error:" + err)
    });

//Routes
app.use('/api/', userRoute);
app.use('/api/', authRoute);

app.listen(process.env.PORT, (req, res) => {
    console.log(`server listening on ${process.env.PORT}`)
})


