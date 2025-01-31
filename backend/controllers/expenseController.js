const User = require('../models/User')
const Expense = require('./../models/Expense')

exports.getExpenses = async (req, res) => {
try{
    const expense =await Expense.find({ user: req.user.id }).populate('user')
    return res.status(200).json({
        success:true,
        expense
    })
}
catch(error){
    res.status(500).json({
        success:false,
        error:error.message
    })}
}

exports.addExpense = async (req, res) => {
    try{
        const {description,amount}=req.body
        if(!description || !amount){
            return res.status(400).json({
                success:false,
                error:'Please provide description and amount'
            })}
            else{
                const user = await User.findById(req.user.id );
                if (!user) {
                    return res.status(404).json({
                      success: false,
                      error: 'User not found',
                    });
                  }
                  const expense = new Expense({
                    description,
                    amount,
                    user: req.user.id,
                  });
                  await expense.save();

                  // Add the expense and update balance
                  user.balance -= amount;  // Subtract amount from balance
    await user.save();
              
                  // Save the updated document
                 
              
                  res.status(201).json({
                    success: true,
                    expense,
                    
                  });
      
    }
    }
    catch(error){
        res.status(500).json({
            success:false,
            error:error.message
        })
    }
}
exports.deleteExpense = async (req, res) => {
    try{
        const userExpense = await Expense.findOne({_id:req.params.id,user:req.user.id})

     

    if (!userExpense) {
      return res.status(404).json({
        success: false,
        error: 'Expense not found',
      });
    }
    const user = await User.findById(req.user.id);
    user.balance += userExpense.amount;  
    await Expense.findByIdAndDelete(req.params.id);
  // Add amount back to balance
    await user.save();
  
    

    res.status(200).json({
      success: true,
      message: 'Expense deleted successfully',
      balance: user.balance
    });
    }
    catch(error){
        res.status(500).json({error:error.message})
    }
}
exports.updateExpense = async (req, res) => {
    try{
const {description,amount}=req.body
const expense=await Expense.findOne({ _id: req.params.id, user: req.user.id})
if(!expense){
    return res.status(404).json({
        success:false,
        error:'Expense not found'
    })}

    const oldAmount = expense.amount;

    // Update the expense details
    expense.description = description || expense.description;
    expense.amount = amount || expense.amount;
    await expense.save();
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found',
      });
    }

    // Update the balance by adjusting for the new and old expense amounts
    user.balance += oldAmount - amount;  // Remove old expense amount and add new one
    await user.save();

    return res.status(200).json({
      success: true,
      expense,
      balance: user.balance,  // Return the updated balance
    });
}catch(error){
    res.status(500).json({
        success:false,
        error:error.message
    })
}
}

    
