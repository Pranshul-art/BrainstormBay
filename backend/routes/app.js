const express=require("express");
const router=express.Router();

const userRoutes=require("./users");
const ideaRoutes=require("./ideas");
const interactionRoutes=require("./interactions");
const filterRoutes=require("./filter");

router.use('/users',userRoutes);
router.use('/ideas',ideaRoutes);
router.use('/interactions',interactionRoutes);
router.use('/filter',filterRoutes);

module.exports=router;