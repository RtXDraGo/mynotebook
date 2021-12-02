const express=require('express');
const User=require('../models/User')//Initialize user from models-User
const { body, validationResult } = require('express-validator');//this is needed for validatin check
const router=express.Router();//intialize router to route
//create a user using /api/auth/createuser and check for validation
router.post('/createuser',[body('email').isEmail(),body('name','Enter a valid name').isLength({ min: 3 }),  body('password','Enter a valid password').isLength({ min: 5 })],(req,res)=>{
    //If there are errors return those errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
        //if no errors initialize name,email,password save to database
    User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      }).then(user => res.json(user))
      .catch(err=>{console.log(err)
      res.json({error:'please enter unique emailid'})})//if duplicate email id is present
    } catch (error) {
     console.error(error.message);   
     res.status(500).send("Some error occured");//if some other errors occures
    }
})

module.exports=router