const mongoose = require('mongoose');

const expenseSchema=mongoose.Schema({
   user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
        description:{
            type:String,
            required:true
        },
        amount:{
            type:Number,
            required:true
        },
        createdAt:{
            type:Date,
            default:Date.now
        }
    
  
})
module.exports=mongoose.model('Expense',expenseSchema);