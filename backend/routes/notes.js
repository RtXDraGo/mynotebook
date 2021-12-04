const express = require('express');
const router = express.Router();//intialize router to route
var getuser=require('../middleware/getuser')
const Notes=require('../models/Notes')
const { body, validationResult } = require('express-validator');
//get all the notes GET api/auth/fetchnotes
router.get('/fetchallnotes',getuser, async (req, res) => {
    try {
        const notes=await Notes.find({user:req.user.id})//fetch all the notes using id
        res.json(notes)   
    }catch (error) {
        console.error(error.message);   
        res.status(500).send("Some error occured");//if some other errors occures
       }
})
//add notes  POST api/auth/addnotes
router.post('/addnote',getuser,[
    body('title','Enter a valid title upto 3 length').isLength({ min: 3 }),  //validation check
    body('description','Enter a description upto 5 length').isLength({ min: 5 })
], async (req, res) => {
    try {
     //defragment body into title,description,tag   
    const {title,description,tag}=req.body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
    }
    const note=new Notes({//create new note  of class Notes and save it 
        title,description,tag,user:req.user.id
    })
    const savednote=await note.save()
    res.json(savednote)
} catch (error) {
    console.error(error.message);   
    res.status(500).send("Some error occured");//if some other errors occures
   }
})

module.exports = router