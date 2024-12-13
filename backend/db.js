const mongoose=require("mongoose");
const connectDB = require("./databaseConnection");


connectDB();
const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        trim:true,
        minLength:3,
        maxLength:20
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
        minLength:11,
        maxLength:30,
        unique:true
    },
    bio:{
        type:String,
        required:false,
        trim:true
    }
},{
    timestamps:true
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
        minLength:5
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
        required:false
    },
    postedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    votes:{
        type:Number,
        default:0
    },
    votedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
    }
},{
    timestamps:true
});

const interactionSchema=new mongoose.Schema({
    idea:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Idea',
        required:true
    },
    type:{
        type:String,
        enum:['vote','comment'],
        required:true
    },
    comment:{
        type:String,
        required:false
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    postedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
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