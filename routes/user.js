const router = require("express").Router();
const User = require('../models/User');
const Order = require('../models/Order');
const Review = require('../models/Review');

// Finds the user with specific id
// This route will go to, /users/:id
router.get('/:id', async (req,res) => {
    try{
        const user = await User.findById(req.params.id);  
        res.json(user);
    }catch(err){
        res.json({message : err})
    }
});

//** ORDERS **/
// List orders placed by a user (on any restaurant)
// Need to display all the orders of the user from any restaurants
router.get('/:id/orders', async(req,res)=>{
    try{
        const orders = await Order
            .find({ "user_id": req.params.id})
            .populate("user_id")
            .populate("restaurant_id");
            //.populate will give us the information about the restaurant and user
            // .populate will convert the restaurant_id or user_id field to it's exact content
            // Inside the .populate just pass the filed that we want

        res.json(orders);

    }catch(err){
        res.json({messsage : err});
    }

});

/** REVIEWS **/
// List reviews placed by specific user to any restaurants
router.get('/:id/reviews', async(req,res)=>{
    try{
        const reviews = await Review
            .find({ "user_id": req.params.id})
            .populate("user_id")
            .populate("restaurant_id");

        res.json(reviews);

    }catch(err){
        res.json({messsage : err});
    }

});

module.exports = router;