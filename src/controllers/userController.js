const userModel=require("../db/userSchema");

const bcrypt=require('bcrypt');

const jwt=require('jsonwebtoken');

const SECREAT_KEY="NOTES_API"
const signup=async(req,resp)=>
{
   //exiting user
   //hashed password
   //create user
   //token generate

   const {username,password,email}=req.body;
   try{
//step 1
    const exixtingUser= await userModel.findOne({email:email});
    if(exixtingUser)
    {
        return resp.status(404).json({message:"user is already present"});
    }
//step 2
    const hashPassword=await bcrypt.hash(password,10);
//step 3
    const userCreate=await userModel.create({
        username:username,
        password:hashPassword,
        email:email
    });
//step 4
    const token=jwt.sign({email:userCreate.email,id:userCreate._id},SECREAT_KEY);
    resp.status(201).json({user:userCreate,token:token});
    console.log("signup successfully");

   }
   catch(err)
   {
    console.log(err);
    resp.status(500).json({message:"something went wrong"})
   }


}



const signin=async(req,resp)=>
{

    const {email,password}=req.body;
try{

    //cheak if user is present or not
    const exixtingUser= await userModel.findOne({email:email});
    if(!exixtingUser)
    {
        return resp.status(404).json({message:"user is not present"});
    }
    const matchPassword=await bcrypt.compare(password,exixtingUser.password);
    if(!matchPassword)
    {
       return resp.status(404).json({message:"invalid crediantials"});
    }

    const token=jwt.sign({email:exixtingUser.email,id:exixtingUser._id},SECREAT_KEY);
    resp.status(201).json({user:exixtingUser,token:token});

    console.log("signin successfully");
    

}
catch(err)
   {
    console.log(err);
    resp.status(500).json({message:"something went wrong"})
   }

}


const update=async(req,resp)=>
{
  try{
      const username=req.body.username;
      const result=await userModel.findOneAndUpdate(username,req.body);
      resp.status(201).json({username:result});
      
  }
  catch(err)
  {
        console.log(err);
  }
}




module.exports={signin,signup,update};