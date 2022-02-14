const mongoose = require('mongoose');
const ReviewSchema = mongoose.Schema({
     user_id : {
         type : mongoose.Schema.Types.ObjectId,
         ref : "User"
     },
     restaurant_id : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Restaurant"
    },
     content : String,

     // Rating
     rating:[{
         food : Number,
         service : Number,
         environment : Number,
         price : Number,
     }],
     date : {
        type: Date,
        default: Date.now
    }
 });

module.exports = mongoose.model("Review",ReviewSchema);

/*
{
	"user_id" : "61d3a88f61aafedadf197bb2",
	"content" : "Sasuke Uchhia Review: It is a great restaurant",
	"rating" : [{
		"food" : 9,
		"service" : 10,
		"environment" : 9,
		"price" : 10
	}]

}
*/