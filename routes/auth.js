const router = require("express").Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//Object destruction
const {registerValidation, loginValidation} = require('../validation');

//Register route
//This will go to, auth/register 
router.post("/register", async (req,res) =>{

    //Validation login before creating user
    const {error} = registerValidation(req.body);

    if(error){
        return res.status(400).send({'error' : error.details[0].message});
        //error message gets store in error.details[0].message
    }

    //Checking if the user is already in the database
    //This will make sure we have unique user
    //If the same user found than just return with 400 error
    const emailExists = await User.findOne(
        {email:req.body.email}
    );
    if (emailExists){
        return res.status(400).send({'error' : 'Email Already Exists'})
    }

    //Hash Passwords
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password,salt);

    //Create a new User
    const user = new User({
        name:req.body.name,
        email: req.body.email,
        password: hashedPassword
    });

    try{
        const savedUser = await user.save();
        res.send({'user_info_backend':user});
        // Better not to sending all the information,
        // It is better to send just the user id, like this:  res.send({'user_id':user._id});
        // But, for simplicity, and to store in the context API in frontend, I am seding the whole user
        // Check src/components/SignUp.js
    }catch(err){
        res.status(400).send(err);
    }
});

// Login Routes
router.post('/login', async (req,res) => {
    //Validation logic before login
    const {error} = loginValidation(req.body);

    if (error){
        return res.status(400).send({'error' : error.details[0].message});
    }

    //Checking if the email exists
    const user = await User.findOne(
        {email : req.body.email}
    );
    if (!user){
        return res.status(400).send({'error' : "Email is not found"});
    }

    //Checking if password is correct
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass){
        return res.status(400).send({'error' : "Invalid Password"});
    }

    //Creating and assigning a token(JWT)
    const token = jwt.sign({_id : user._id}, process.env.TOKEN_SECRET);

    res.header('authToken',token).send({'authToken' : token, 'user_info_backend' : user});
    // Sending the authToken as well as all the user information 
    // Storing the user info in user_info_backend and using ContextAPI in frontend to store those user info
   
   // res.send("Logged in"); //Not correct, must be in json object
});

module.exports = router;




