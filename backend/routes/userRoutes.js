const router=require('express').Router()
const { protect } = require('../middleware/middleware')
const {register, login, updateUser, getUser}=require('./../controllers/userController')
router.post('/register',register)
router.post('/login',login)
router.post('/update-user',protect,updateUser)
router.get('/get-user',protect,getUser)
module.exports=router