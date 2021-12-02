const express=require('express');
const User=require('../models/User')
const { body, validationResult } = require('express-validator');
const router=express.Router();
//create a user using /api/auth/createuser
router.post('/createuser',[body('email').isEmail(),body('name','Enter a valid name').isLength({ min: 3 }),  body('password','Enter a valid password').isLength({ min: 5 })],(req,res)=>{
    //If there are errors return those errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
    Userd.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      }).then(user => res.json(user))
      .catch(err=>{console.log(err)
      res.json({error:'please enter unique emailid'})})
    } catch (error) {
     console.error(error.message);   
     res.status(500).send("Some error occured");
    }
})

module.exports=router