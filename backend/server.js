const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const userRoute = require('./routes/userRoute.js');

dotenv.config();

const app = express();
app.use(express.json());

app.use(cors());

mongoose.connect(process.env.URI)
.then(() => {
    console.log("connected to mongodb");
    app.listen(process.env.PORT || 4000, (e) => {
        if(e) console.log(e);
        console.log(`Running at port ${process.env.PORT}`)
    });
})
.catch(e => console.log("error", e))

app.use('/api/user', userRoute);