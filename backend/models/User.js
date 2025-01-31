const mongoose=require('mongoose');

const userSchema=mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    balance:{
      type:Number,
        default:0  
    },

    password:{
        type:String,
        required:true
    },
    expenses:{
        type: mongoose.Schema.Types.ObjectId,
      ref:'Expense'
},
    createdAt:{
        type:Date,
        default:Date.now
    }

})
module.exports=mongoose.model('User',userSchema);