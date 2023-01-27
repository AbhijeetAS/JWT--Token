const notemodel=require("../db/noteSchema")

const createNote=async(req,resp)=>
{
    const {title,description}=req.body;
    const newNote=new notemodel({
        title:title,
        description:description,
        userID:req.userID
    })

    try{
        await newNote.save();
        resp.status(201).json(newNote);

    }
    catch(err)
    {
        console.log(err);
        resp.status(500).json({message:"something went wrong"});
    }
}

const updateNote=async(req,resp)=>
{
   const id=req.params.id;
   const {title,description}=req.body;
   const newNote={
    title:title,
    description:description,
    userID:req.userID
   }
   try{
    await notemodel.findByIdAndUpdate(id,newNote,{new:true});
    resp.status(200).json(newNote);
   }
   catch(err)
   {
    console.log(err);
    resp.status(500).json({message:"something went wrong"});
   }

}

const deleteNote=async(req,resp)=>
{
    const id=req.params.id;
    try
    {
     const note=await notemodel.findByIdAndRemove(id);
     resp.status(202).json(note)
    }
    catch(err)
    {
        console.log(err);
        resp.status(500).json({message:"something went wrong"});
    }
}

const getNote=async(req,resp)=>
{
  
    try{
        const notes=await notemodel.find({userID:req.userID});
        resp.status(200).json(notes);
    }
    catch(err)
    {
        console.log(err);
    }

}

module.exports={createNote,updateNote,deleteNote,getNote}