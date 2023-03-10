const mongoose=require('mongoose');

const noteSchema=mongoose.Schema({
    title:{
        type:String,
        required:true
    },

    description:{
        type:String,
        required:true
    },

    userID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    }
})

module.exports=mongoose.model('Note',noteSchema);