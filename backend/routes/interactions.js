const express=require("express");
const { authMiddleware } = require("../middleware");
const { Idea, Interaction } = require("../db");
const router=express.Router();

router.post('/vote',authMiddleware,async (req,res)=>{
    //vote logic
    const { ideaId }=req.body;
    const userId=req.userId;
    try{
        const idea=await Idea.findById(ideaId);
        if(!idea){
            return res.status(404).json({message:"Idea was not found"});
        }
        if(idea.votedBy.includes(userId)){
            return res.status(400).json({
                message:'You have already voted'
            })
        }
        const updatedIdea = await Idea.findByIdAndUpdate(
            ideaId,
            {
                $inc: { votes: 1 },  
                $addToSet: { votedBy: userId } 
            },
            { new: true } 
        );

        if (!updatedIdea) {
            return res.status(404).json({ message: "Idea not found" });
        }


        const newVote=await Interaction.create({
            idea:ideaId,
            type:'vote',
            postedBy:userId
        });
        
        res.status(200).json({
            message:'Vote added successfully'
        });
    }catch(err){
        res.status(500).json({
            message:'Something went wrong',err
        });
    }
});

router.post('/comment',authMiddleware,async (req,res)=>{
    //comment logic
    const {ideaId}=req.body;
    const {comment}=req.body;
    const userId=req.userId;
    try{
        if(!comment || comment.trim()===""){
            return res.status(400).json({message:"Comment cannot be left empty"});
        }
        const idea=await Idea.findById(ideaId);
        if(!idea){
            return res.status(404).json({message:"Idea was not found"});
        }
        const newComment=await new Interaction.create({
            idea:ideaId,
            type:'comment',
            comment,
            postedBy:userId
        });
        res.status(200).json({
            message:"Comment posted successfully",

            comment:newComment
        })
    }catch(err){
        res.status(500).json({
            message:"Something went wrong",err
        })
    }
    
});

router.get('/Idea',async (req,res)=>{
    //get idea logic onclicking the idea(interaction page)
    const {ideaId}=req.query;
    try{
        const idea=await Idea.findById(ideaId).populate('postedBy','username');
        if(!idea){
            return res.status(404).json({message:"Idea was not found"});

        }
        const interactions=await Interaction.find({
            idea:ideaId
        }).populate('postedBy','username');
        res.status(200).json({
            idea: {
                title: idea.title,
                description: idea.description,
                about: idea.about || "",
                techno: idea.techno || "",
                company: idea.company || "",
                build: idea.build,
                postedBy: idea.postedBy.username,
                votes: idea.votes
            },
            interactions: interactions.map(interaction => ({
                type: interaction.type,
                comment: interaction.comment,
                createdAt: interaction.createdAt,
                postedBy: interaction.postedBy.username
            }))
        });
    }catch(err){
        res.status(500).json({message:"Something went wrong",err});
    }
})
module.exports=router;