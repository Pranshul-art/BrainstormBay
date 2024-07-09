const express=require("express");
const router=express.Router();

router.post('/:ideaId/vote',(req,res)=>{
    //vote logic
});

router.post('/:ideaId/comment',(req,res)=>{
    //comment logic
});

module.exports=router;