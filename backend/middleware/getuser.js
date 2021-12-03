var jwt = require('jsonwebtoken');
const JWT_SECRET='Iamagoodboy';
const getuser=(req,res,next)=>{
//get jwt from user and and add id to req 

const token=req.header('auth-token');
if(!token)
{
     res.status(401).send({error:"please authenticate with correct token"})


}
try {
    const data=jwt.verify(token,JWT_SECRET)
    req.user=data.user
    next();   
} catch (error) {
     res.status(401).send({error:"please authenticate with correct token"})

}
}




module.exports=getuser