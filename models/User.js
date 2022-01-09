const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        min:6,
        max:255
    },
    email:{
        type: String,
        required: true,
        min:6,
        max:255
    },
    password:{
        type: String,
        required: true,
        min:6,
        max:1024
    }
});

module.exports = mongoose.model("User",userSchema);

//The password is same as the first name

/*
In Postman

To add user, that is to register
{
	"name" : "Lordof Pain",
	"email" : "pain@naruto.com",
	"password" : "Lordof"
}

To login,
{
    "email" : "pain@naruto.com",
	"password" : "Lordof"
}

*/