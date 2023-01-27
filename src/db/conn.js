const mongoose=require("mongoose");

mongoose.connect("mongodb://localhost:27017/epic").
then(()=>
{
    console.log("connected successfully");
}).
catch((err)=>
{
     console.log("no connection");
})