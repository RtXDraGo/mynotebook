const mongoose = require('mongoose');//Creating data base
const NotesSchema = new Schema({//Initializing schema
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
module.export=mongoose.model('notemodel',NotesSchema);//Converting to model