const { application } = require("express");
const express = require("express");
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

//Importing the aith routes from the routes folder
const authRoute = require('./routes/auth');
const userRoute = require('./routes/user');
const restaurantRoute = require('./routes/restaurant');
const searchRoute = require('./routes/search')

//Middlewares
app.use(express.json());

//Route Middlewares
app.use('/auth',authRoute);
app.use('/users',userRoute);
app.use('/restaurants',restaurantRoute);
app.use('/search',searchRoute);

//Database connection
mongoose.connect(
    process.env.DB_CONNECTION,
    {useNewUrlParser : true},
    () => console.log("Connected to DB!")
);

app.listen(3000,() => console.log("Server running on port 3000"));

//Change