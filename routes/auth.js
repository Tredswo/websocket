const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt= require("bcryptjs");
const{User}= require("../models");
const router = express.Router();

router.post("/signup",async(req,res)=>{
    const {username,passoword}=req.body;
    const hashedPassword = await bcrypt.hash(passoword,10);
    try{
        const user= await User.create({username,passoword:hashedPassword});
        res.status(201).json(user);
    }catch(e){
        res.status(400).json({error:e});
    }
});

router.post("/login",async(req,res)=>{
    const{username,passoword}=req.body;
    const user = await User.findOne({where:{username}});//SQL QUERY- SELECT* FROM USERS WHERE USERNAME=USERNAME
    if(user &&(await bcrypt.compare(passoword,user.password))){
        const token = jwt.sign({id:user,username:user.username},"secret")
        res.json({token});
    }
    else{
        res.status(401).json({error:"INVALID CREDS"});
    }
});

module.exports = router;