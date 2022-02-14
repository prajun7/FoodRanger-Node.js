const router = require("express").Router();
const Restaurant = require('../models/Restaurant');

// Finds the restaurants with given name or given area
// This route will go to, /search?[name=name][&[area=area]]
// In postman, search?name=Nami Restaurant&area=Nami Island
router.get('/', async (req,res) => {
    try{
        let restaurantName = req.query.name;
        let restaurantArea = req.query.area;

        if (restaurantName != undefined && restaurantArea != undefined ){
            let search = {
                name : restaurantName,
                area : restaurantArea
            }
        }
        else if(restaurantName != undefined && restaurantArea == undefined){
            search = {
                name : restaurantName
            }
        }
        else if(restaurantName == undefined && restaurantArea != undefined){
            search = {
                area : restaurantArea
            }
        }
        else if(restaurantName == undefined && restaurantArea == undefined){
            search = {}
        }  

        const restaurant = await Restaurant.find(search);
        //If using find,than we need to do (!restaurant.length) because find returns []
        //(!restaurant) will work for findOne beacuse, findOne returns null
     
        if(!restaurant.length){
            return res.send("Please check the restaurant's name and address again");
        }

        res.json({message : restaurant});

        
    }catch(err){
        res.json({message : err})
    }
});

module.exports = router;