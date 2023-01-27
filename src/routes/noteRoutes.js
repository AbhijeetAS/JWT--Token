const { response } = require('express');
const express=require('express');
const noteRouter=express.Router();
const auth=require("../middleware/auth")
const {getNote,createNote,deleteNote,updateNote}=require("../controllers/noteController")

noteRouter.get('/',auth,getNote);

noteRouter.post('/',auth,createNote);

noteRouter.delete("/:id",auth,deleteNote)

noteRouter.put("/:id",auth,updateNote)



module.exports=noteRouter;