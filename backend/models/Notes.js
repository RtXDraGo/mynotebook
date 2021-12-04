const mongoose = require('mongoose');//Creating data base
const { Schema } = mongoose;
const NotesSchema = new Schema({//Initializing schema
  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'user'
  },
  title:{
      type:String,
    required:true
  },
description:{
    type:String,
    required:true
},
tag:{
    type:String,
    default:"General"
},
date:{
    type:Date,
    default:Date.now
},
});
module.exports=mongoose.model('notes',NotesSchema);//Converting to model