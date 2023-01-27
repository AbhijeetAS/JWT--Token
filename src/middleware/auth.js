const jwt=require("jsonwebtoken");
const SECREAT_KEY="NOTES_API"

const auth=(req,resp,next)=>
{
    try
    {
        let token=req.headers.authorization;
        if(token)
        {
          token=token.split(" ")[1];
          let  user=jwt.verify(token,SECREAT_KEY);
          req.userID=user.id;
          next();

        }
        else
        {
            resp.status(401).json({message:"unauthorized user"});
        }
        
    }
    catch(err)
    {
        console.log(err);
        resp.status(401).json({message:"unauthorized user"});

    }
}

module.exports=auth;