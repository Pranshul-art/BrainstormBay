const express=require('express');
const router=express.Router();

router.get('/views',(req,res)=>{
    //get ideas sorted by views logic
});

router.get('/popularity',(req,res)=>{
    //get ideas sorted by popularity logic (means [upvote-downvote])
});

router.get('/recent',(req,res)=>{
    //get recent ideas 
});

router.get('/search',(req,res)=>{
    //search ideas on the basis of title
});

router.get('/category',(req,res)=>{
    //filter ideas by company name and technology
});