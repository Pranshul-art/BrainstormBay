const express=require('express');
const { Idea } = require('../db');
const router=express.Router();

router.get('/views',async (req,res)=>{
    //get ideas sorted by views logic
});

router.get('/popularity',(req,res)=>{
    //get ideas sorted by popularity logic (means [upvote-downvote])
});

router.get('/recent',(req,res)=>{
    //get recent ideas 
});



router.get('/category',(req,res)=>{
    //filter ideas by company name and technology
});
module.exports=router;