const express = require('express');
const router = express.Router();//intialize router to route
var getuser=require('../middleware/getuser')
const Notes=require('../models/Notes')
const { body, validationResult } = require('express-validator');
//route1 get all the notes GET api/auth/fetchnotes
router.get('/fetchallnotes',getuser, async (req, res) => {
    try {
        const notes=await Notes.find({user:req.user.id})//fetch all the notes using id
        res.json(notes)   
    }catch (error) {
        console.error(error.message);   
        res.status(500).send("Some error occured");//if some other errors occures
       }
})
//route2 add notes  POST api/auth/addnotes
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
//update  notes  POST api/auth/updatenote login required
router.put('/updatenote/:id',getuser, async (req, res) => {
    const{title,description,tag}=req.body
    //create newnote object
    const newnote={};
    if(title){newnote.title=title};
    if(description){newnote.description=description};
    if(tag){newnote.tag=tag};
    //find note and update it
    // const note=Notes.findByIdAndUpdate()
     note=await Notes.findById(req.params.id)
    if(!note){return res.status(401).send("not found")}
    if(note.user.toString()!==req.user.id){
        return res.status(401).send("not allowed");
    }
    note = await Notes.findByIdAndUpdate(req.params.id,{$set:newnote}, {new:true})
    res.json(note);
})
module.exports = router