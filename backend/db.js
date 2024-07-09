const mongoose=require("mongoose");

mongoose.connect("mongodb+srv://Pranshul-art:pranshul%4012@BrainstormBay_cluster2.pwwjlxp.mongodb.net/Brainstorm")

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        trim:true,
        unique:true,
        minLength:3,
        maxLength:10
    },
    password:{
        type:String,
        required:true,
        minLength:6
    },
    email:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
        unique:true,
        minLength:11,
        maxLength:30
    }
});

const ideaSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
        minLength:4
    },
    description:{
        type:String,
        required:true,
        maxLength:150,
        minLength:50
    },
    about:{
        type:String,
        required:false,
        
    },
    techno:{
        type:String,
        required:false
    },
    company:{
        type:String,
        required:false
    },
    build:{
        type:String,
        enum:['Software','Hardware'],
        required:true
    },
    postedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    }
});

const interactionSchema=new mongoose.Schema({
    idea:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Idea',
        required:true
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    type:{
        type:String,
        enum:['vote','comment'],
        required:true
    },
    content:{
        type:String,
        required:false
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
});

const filterSchema=new mongoose.Schema({
    ideaId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Idea',
        required:true
    },
    category:{
        type:String,
        enum:['Software','Hardware'],
        required:true
    },
    postedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:false
    },
    tags:String,
    votes:{
        type:Number,
        default:0
    },
    company:{
        type:String,
        default:null
    },
    techStack:{
        type:String,
        default:null
    }
})

const User=mongoose.model('User',userSchema);
const Idea=mongoose.model('Idea',ideaSchema);
const Interaction=mongoose.model('Interaction',interactionSchema);
const Filter=mongoose.model('Filter',filterSchema);

module.exports={User,Idea,Interaction,Filter};