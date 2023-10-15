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

router.put('/accounts/:accountId/transactions/:transactionId', tokenValidation.validateToken, userController.updateTransaction);

router.get(
  '/accounts',
  tokenValidation.validateToken,
  userController.getAccounts
)

router.get('/accounts/:accountId/transactions', tokenValidation.validateToken, userController.getTransactions);

router.delete('/accounts/:accountId/transactions/:transactionId', tokenValidation.validateToken, userController.deleteTransaction);


module.exports = router