const express=require("express");
const { authMiddleware } = require("../middleware");
const router=express.Router();
const zod=require("zod");
const { Idea, User } = require("../db");


const IdeaPostSchema=zod.object({
    title:zod.string().min(1,"Title is required").max(50,"Title has to be short under 50 words"),
    description:zod.string().min(5,"Description is required"),
    about:zod.string().optional(),
    technologies:zod.string().optional(),
    company:zod.string().optional(),
    build:zod.string().optional()
})
router.post('/',authMiddleware,async (req,res)=>{
    //create idea logic
    const ideaPost=IdeaPostSchema.safeParse(req.body);
    if(!ideaPost.success){
        return res.status(411).json({
            message:"Something is wrong with your post"
        })
    }
    try{
        const {title,description,technologies}=ideaPost.data;
        const created=await Idea.create({
            title,
            description,
            techno:technologies,
            postedBy:req.userId
        })
        res.status(200).json({
            message:"Idea posted successfully"
        });
    }catch(err){
        res.status(500).json({
            message:'Error creating idea',err
        })
    }
    
});

router.get('/',authMiddleware,async (req,res)=>{
    //get all ideas logic
    const filter=req.query.filter || "";
    try{
        const ideas=await Idea.find({
            
                title:{
                    $regex:filter,
                    $options:"i"
                }
                
        }).populate('postedBy','username')
        res.json({
            idea: ideas.map(idea => ({
                _id:idea._id,
                title: idea.title,
                description: idea.description,
                about: idea.about || "",
                techno:idea.techno || "",
                company:idea.company || "",
                build:idea.build,
                votes:idea.votes,
                postedBy:idea.postedBy.username
            }))
        });
    }catch(err){
        res.status(500).json({
            message:'Error getting ideas',err
        })
    }
});

router.get('/search',async (req,res)=>{
    //search ideas on the basis of title
    try{
        const {
            filter="",
            sortBy='votes',
            order='desc'
        }=req.query
        const sortOptions={}
        sortOptions[sortBy]= order==='desc'?-1:1;
        const ideas=await Idea.find({
            $or:[{
                title:{
                    "$regex":filter,
                    "$options": "i"
                }
            },{
                description:{
                    "$regex":filter,
                    "$options":"i"
                }
            },{
                techno:{
                    "$regex":filter,
                    "$options":"i"
                }
            }]
            
        }).populate({
            path:'postedBy',
            select:'username'
        }).sort({_id:-1})
        .limit(20)
        res.json({
            idea:ideas.map(idea=>({
                title: idea.title,
                description: idea.description,
                about: idea.about || "",
                techno:idea.techno || "",
                company:idea.company || "",
                build:idea.build,
                author:idea.postedBy?idea.postedBy.username:"Unknown",
                votes:idea.votes
            }))
        })
    }catch(err){
        console.error('Search ideas error:',err)
        res.status(500).json({
            message:'Error searching ideas',
            error:err.message
        })
    }
    
});

router.get('/ideaId',authMiddleware,async (req,res)=>{
    //get specific idea logic
    try{
        const ideas=await Idea.find({
            postedBy:req.userId
        })
        const user=await User.findById({
            _id:req.userId
        });
        if(ideas.length === 0){
            return res.status(404).json({
                message:'No ideas has been posted'
            });
        }
        res.json({
            idea: ideas.map(idea => ({
                title: idea.title,
                description: idea.description,
                about: idea.about || "",
                techno:idea.techno || "",
                company:idea.company || "",
                build:idea.build,
                postedBy:user.username,
                votes:idea.votes
            }))
        })
    }catch(err){
        res.status(500).json({
            message: 'Error fetching user ideas',
            error: err
        })
    }
});

router.put('/:ideaId',(req,res)=>{
    //update idea logic
});

router.delete('/:ideaId',(req,res)=>{
    //delete idea logic
});

module.exports=router;

