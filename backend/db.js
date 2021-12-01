const  Mongoose  = require("mongoose");

const mongurl="mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&ssl=false"
const mongoConnect=()=>{
    Mongoose.connect(mongurl,()=>{
        console.log("Data base connection succsesfull")
    })
}
module.exports=mongoConnect;