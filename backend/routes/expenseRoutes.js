const router = require('express').Router();
const { getExpenses, addExpense, deleteExpense, updateExpense, updateBalance}=require('./../controllers/expenseController')
const { protect } = require('./../middleware/middleware')

router.get('/get-expenses',protect,getExpenses)
router.post('/add-expense',protect,addExpense)
router.put('/update-expense/:id',protect,updateExpense)
router.delete('/delete-expense/:id',protect,deleteExpense)

module.exports = router
