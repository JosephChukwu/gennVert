const express = require('express')
const verifyToken = require('../middlewares/verifyToken')
const {updateUser} = require('../controllers/userController.js')

const userRouter = express.Router()


userRouter.patch('/updateUser/:id', verifyToken, updateUser)





module.exports = userRouter