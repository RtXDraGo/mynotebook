const express=require('express');
const User=require('../models/User')//Initialize user from models-User
const { body, validationResult } = require('express-validator');//this is needed for validatin check
const router=express.Router();//intialize router to route
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const JWT_SECRET='I am a good boy'
//create a user using /api/auth/createuser and check for validation
router.post('/createuser',[body('email').isEmail(),body('name','Enter a valid name').isLength({ min: 3 }),  body('password','Enter a valid password').isLength({ min: 5 })],async (req,res)=>{
    //If there are errors return those errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
        //if no errors initialize name,email,password save to database
        const salt=await bcrypt.genSalt(10);
        secPass=await bcrypt.hash(req.body.password,salt)
        let user=await User.findOne({email:req.body.email});
        if(user)
        {
          return res.status(400).json({error:"Emails should be unique"})
        }
     user=await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      })
      const data={
          user:{
              id:user.id
          }
      }
      const jwdata=jwt.sign(data,JWT_SECRET);
      console.log(jwdata)
      res.json(user)
      //if duplicate email id is present
    } catch (error) {
     console.error(error.message);   
     res.status(500).send("Some error occured");//if some other errors occures
    }
})
module.exports=router