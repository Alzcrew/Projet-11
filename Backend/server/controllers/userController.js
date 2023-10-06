const userService = require('../services/userService');
const { v4: uuidv4 } = require('uuid'); 

module.exports.createUser = async (req, res) => {
  let response = {};
  try {
    req.body.accounts = [
      { accountId: uuidv4(), title: 'Compte Courant', amount: 0 },
      { accountId: uuidv4(), title: 'Compte Épargne', amount: 0 },
      { accountId: uuidv4(), title: 'Compte Investissement', amount: 0 }
    ];
    console.log("Generated Account IDs:", req.body.accounts);
    const responseFromService = await userService.createUser(req.body);
    response.status = 200;
    response.message = 'User successfully created';
    response.body = responseFromService;
  } catch (error) {
    console.error('Something went wrong in userController.js', error);
    response.status = 400;
    response.message = error.message;
  }
  return res.status(response.status).send(response);
};

module.exports.loginUser = async (req, res) => {
  let response = {}

  try {
    const responseFromService = await userService.loginUser(req.body)
    response.status = 200
    response.message = 'User successfully logged in'
    response.body = responseFromService
  } catch (error) {
    console.error('Error in loginUser (userController.js)')
    console.log(error)
    response.status = 400
    response.message = error.message
  }

  return res.status(response.status).send(response)
}

module.exports.getUserProfile = async (req, res) => {
  let response = {}

  try {
    const responseFromService = await userService.getUserProfile(req)
    response.status = 200
    response.message = 'Successfully got user profile data'
    response.body = responseFromService
  } catch (error) {
    console.log('Error in userController.js')
    response.status = 400
    response.message = error.message
  }

  return res.status(response.status).send(response)
}

module.exports.updateUserProfile = async (req, res) => {
  let response = {}

  try {
    const responseFromService = await userService.updateUserProfile(req)
    response.status = 200
    response.message = 'Successfully updated user profile data'
    response.body = responseFromService
  } catch (error) {
    console.log('Error in updateUserProfile - userController.js')
    response.status = 400
    response.message = error.message
  }

  return res.status(response.status).send(response)
}

module.exports.getAccounts = async (req, res) => {
  let response = {}

  try {
    const userId = req.user.id
    console.log(userId);
    const responseFromService = await userService.getAccounts(userId)
    response.status = 200
    response.message = 'Successfully got user accounts'
    response.body = responseFromService
  } catch (error) {
    console.log('Error in getAccounts - userController.js')
    response.status = 400
    response.message = error.message
  }
  return res.status(response.status).send(response)
}