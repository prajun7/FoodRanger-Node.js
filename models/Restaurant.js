const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
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
    menu :[{
        name : String,
        unit_price : Number
    }],
    area :{
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Restaurant",restaurantSchema);


/*
To create restaurant from postman, we need to pass

{
	"name" : "Ramen",
	"email" : "naruto@naruto.com",
	"menu" : [{
			"name" : "Chicken ramen",
			"unit_price" : 35
		},
		{
			"name" : "Fried chicken ramen",
			"unit_price" : 15
		},
		{
			"name" : "Goat ramen",
			"unit_price" : 55
		},
		{
			"name" : "Ramen special",
			"unit_price" : 45
		},
		{
			"name" : "Vegetable Ramen",
			"unit_price" : 35
		},
		{
			"name" : "Naruto's specialRamen",
			"unit_price" : 135
		},
		{
			"name" : "Favourite specialRamen",
			"unit_price" : 105
		}
		],
		"area" : "Hidden Leaf Village"
}

*/
