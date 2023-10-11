const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const tokenValidation = require('../middleware/tokenValidation')

router.post('/signup', userController.createUser)

router.post('/login', userController.loginUser)

router.post(
  '/profile',
  tokenValidation.validateToken,
  userController.getUserProfile
)

router.post('/accounts/:accountId/transactions', tokenValidation.validateToken, userController.addTransaction);


router.put(
  '/profile',
  tokenValidation.validateToken,
  userController.updateUserProfile
)

router.get(
  '/accounts',
  tokenValidation.validateToken,
  userController.getAccounts
)

router.get('/accounts/:accountId/transactions', tokenValidation.validateToken, userController.getTransactions);


module.exports = router