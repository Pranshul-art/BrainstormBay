const express=require("express");
const router=express.Router();
const zod=require("zod");
const jwt=require("jsonwebtoken");
const User=require("../db");
const JWT_SECRET=require("../config");

const Schema=zod.object({
    email:zod.string().email(),
    username:zod.string(),
    password:zod.string().min(6)
})

router.post("/signup",async (req,res)=>{
    const {username,password,email}=req.body;
    const response=Schema.safeParse({
        username,
        email,
        password
    });
    if(!response.success){
        return res.status(411).json({
            message:"Incorrect inputs"
        })
    }
    const existingUser = await User.findOne({
        email:email
    });
    if(existingUser){
        return res.status(411).json({
             message:"Email already taken"
        })
    }

    const user=User.create({
        username,
        email,
        password
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

router.get("/profile",(req,res)=>{

});

router.put("/profile",(req,res)=>{

});

module.exports=router;