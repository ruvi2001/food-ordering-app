import { Router } from "express";
import { FoodModel } from '../models/food.model.js';
import asynchandler from "express-async-handler";


const router = Router();

router.get(       //return all the foods
    '/',
    asynchandler(async (req, res) => {
        const foods = await FoodModel.find({});
        res.send(foods);
})
);

router.get(
    '/tags', 
    asynchandler(async (req, res)  => {           //we can't get tags from the database. so we have to get it from foods.since each food has a list of tags we need to use aggregate function.
    const tags = await FoodModel.aggregate([  //by using aggregate function we can run an array of operators and functions on our mongoose model inside the database.
     {
        $unwind: '$tags', //unwind operator makes the tags flat.we make a list of foods that each food has a single tag. we created a single row for every single tag

     },
     {
     $group: {  //by this we are going to group them together using tag as the id
        _id: '$tags',
        count: { $sum:1}, // this give us the count of foods with that specific tag
     },
    },
    {
        $project: {
            _id: 0, // id = 0 means we don't need to return the id
            name: '$_id',
            count: '$count',

        },
    },

    ]).sort({count: -1});  //sort all the tags based on the count. -1 means desending order. 1 means ascending order

  const all = {  
    name: 'All',
    count: await FoodModel.countDocuments(),
    
  };

    tags.unshift(all); //unshift adds the items to the begining of the array

    res.send(tags);
})
);

router.get(
    '/search/:searchTerm', 
    asynchandler(async (req, res) => {
    const {searchTerm} = req.params;
    const searchRegex = new RegExp(searchTerm, 'i');

    const foods = await FoodModel.find({ name: { $regex: searchRegex} });
    res.send(foods);
    })
);

router.get(
    '/tag/:tag',
    asynchandler(async (req,res) => {
    const { tag } = req.params;
    const foods = await FoodModel.find({ tags: tag});
    res.send(foods);
})
);



router.get(
    '/:foodId',
    asynchandler(async (req,res) => {
    const { foodId } = req.params;
    const food = await FoodModel.findById(foodId);
    res.send(food);
})
);


export default router;