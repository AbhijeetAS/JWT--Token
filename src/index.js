const express=require("express");
const noteRouter = require("./routes/noteRoutes");
const userRouter = require("./routes/userRoutes");
require('./db/conn');

const app=express();
app.use(express.json());

const port=process.env.PORT || 6000




app.use("/users",userRouter)

app.use("/notes",noteRouter)




app.get("/",(req,resp)=>
{
    resp.send("hello from the abhijeet");
})






app.listen(port,()=>
{
    console.log(`server is running at port number ${port}`);
})