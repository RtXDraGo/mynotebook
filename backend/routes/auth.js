const express=require('express');
const User=require('../models/User')//Initialize user from models-User
const { body, validationResult } = require('express-validator');//this is needed for validatin check
const router=express.Router();//intialize router to route
const bcrypt = require('bcryptjs');
var getuser=require('../middleware/getuser')
var jwt = require('jsonwebtoken');
const JWT_SECRET='Iamagoodboy'
//Route1 create a user using /api/auth/createuser and check for validation no login required
router.post('/createuser',[body('email').isEmail(),body('name','Enter a valid name').isLength({ min: 3 }),  body('password','Enter a valid password').isLength({ min: 5 })],async (req,res)=>{
  let success=false;
    //If there are errors return those errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success,errors: errors.array() });
    }
    try {
        const salt=await bcrypt.genSalt(10);
        secPass=await bcrypt.hash(req.body.password,salt)
        //if duplicate email id is present
        let user=await User.findOne({email:req.body.email});//search in User model for same email
        if(user)
        {

          success=false;
          return res.status(400).json({success,error:"Emails should be unique"})
        }

                //if no errors initialize name,email,password save to database
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
      success=true;
      res.json({success,jwdata})
    } catch (error) {
     console.error(error.message);   
     res.status(500).send("Some error occured");//if some other errors occures
    }
})
//Route2 login user using /api/auth/login  login required
router.post('/login',[body('email','Enter a valid email').isEmail(),body('password','Password can not be blank').exists(),],async(req,res)=>{
  //If error occurs return bad request and errors
  const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {email,password}=req.body;
    try {
      let user=await User.findOne({email});
      if(!user){
      return res.status(404).json({error:"please login with correct details"})
    }
      const pass=await bcrypt.compare(password , user.password)
      if(!pass)
      {
        success=false;
        return res.status(404).json({success,error:"please login with correct details"})        
      }
      const data={
        user:{
             id:user.id
        }
    }
    const jwdata=jwt.sign(data,JWT_SECRET);
    success=true;
    res.json({success,jwdata})
    } catch (error) {
      console.error(error.message);   
      res.status(500).send("Some error occured");//if some other errors occures
     }
})
//Route3 get logged in user details  using POST /api/auth/getdata  login required
router.post('/getdata',getuser,async(req,res)=>{
try {
  userId=req.user.id;
  const user=await User.findById(userId).select("-password")
  res.send(user)
} catch (error) {
  console.error(error.message);   
  res.status(500).send("Some error occured");//if some other errors occures
 }
})
module.exports=router