const express=require("express");
const router=express.Router();
const zod=require("zod");
const jwt=require("jsonwebtoken");
const { User }=require("../db");
const { JWT_SECRET }=require("../config");
const { authMiddleware } = require("../middleware");

const Schema=zod.object({
    email:zod.string().email(),
    username:zod.string(),
    password:zod.string().min(6)
})

router.post("/signup",async (req,res)=>{
    //const {username,password,email}=req.body;
    const { success }=Schema.safeParse(req.body);
    if(!success){
        return res.status(411).json({
            message:"Incorrect inputs"
        })
    }
    const existingUser = await User.findOne({
        email:req.body.email
    });
    if(existingUser){
        return res.status(411).json({
             message:"Email already taken"
        })
    }

    const user=await User.create({
        username:req.body.username,
        email:req.body.email,
        password:req.body.password
    })
    const userId=user._id;

    const token=jwt.sign({userId},JWT_SECRET);

    res.json({
        message:"User created successfully",
        token:token
    });
});

const signinBody=zod.object({
    email:zod.string().email(),
    password:zod.string()
})
router.post("/signin",async (req,res)=>{
    const {email,password}=req.body;
    const response=signinBody.safeParse({
        email,
        password
    })
    if(!response){
        return res.status(411).json({
            message:"Incorrect inputs"
        })
    }
    const user=await User.findOne({
        email,
        password
    });
    if(user){
        const userId=user._id;
        const token=jwt.sign({userId},JWT_SECRET);
        res.status(200).json({
            token:token
        })
        return 
    };
    
    res.status(411).json({
        message:"Error while logging in"
    })
});

router.get("/profile",async (req,res)=>{
    const filter = req.query.filter || '';

    const users = await User.find({
        $or: [{
            username: {
                "$regex": filter,
                "$options": "i"
            }
        }]
    })

    res.json({
        user: users.map(user => ({
            username: user.username,
            _id: user._id
        }))
    })
});



router.get('/',authMiddleware,async (req,res)=>{
    try{
        const response=await User.findById(req.userId);
        res.status(200).json({username:response.username,email:response.email,bio:response.bio||"",createdAt:response.createdAt||""})
    }catch(err){
        res.status(500).json({message:"Error while fetching your account",err})
    }
    

})


const updateInfo=zod.object({
    username:zod.string().optional(),
    password:zod.string().min(6).optional()
})
router.put("/profile",authMiddleware,async (req,res)=>{
    const { success } = updateInfo.safeParse(req.body)
    if (!success) {
        res.status(411).json({
            message: "Error while updating information"
        })
    }

    await User.updateOne({
        _id: req.userId
    },req.body )

    res.json({
        message: "Updated successfully"
    })
});

module.exports=router;