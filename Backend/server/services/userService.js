const User = require('../database/models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports.createUser = async serviceData => {
  try {
    const user = await User.findOne({ email: serviceData.email });
    if (user) {
      throw new Error('Email already exists');
    }
    const hashPassword = await bcrypt.hash(serviceData.password, 12);
    const newUser = new User({
      email: serviceData.email,
      password: hashPassword,
      firstName: serviceData.firstName,
      lastName: serviceData.lastName,
      userName: serviceData.userName,
      accounts: serviceData.accounts
    });
    return await newUser.save();
  } catch (error) {
    console.error('Error in userService.js', error);
    throw new Error(error);
  }
};


module.exports.loginUser = async serviceData => {
  try {
    console.log("Email:", serviceData.email);
    console.log("Password:", serviceData.password);
    const user = await User.findOne({ email: serviceData.email });

    if (!user) {
      throw new Error('User not found!');
    }

    const isValid = await bcrypt.compare(serviceData.password, user.password);

    if (!isValid) {
      throw new Error('Password is invalid');
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.SECRET_KEY || 'default-secret-key',
      { expiresIn: '1d' }
    );

    return { token };
  } catch (error) {
    console.error('Error in userService.js', error);
    throw new Error(error);
  }
};

module.exports.getUserProfile = async serviceData => {
  try {
    const jwtToken = serviceData.headers.authorization.split('Bearer ')[1].trim();
    const decodedJwtToken = jwt.decode(jwtToken);
    const user = await User.findOne({ _id: decodedJwtToken.id });

    if (!user) {
      throw new Error('User not found!');
    }

    return user.toObject();
  } catch (error) {
    console.error('Error in userService.js', error);
    throw new Error(error);
  }
};



module.exports.getAccounts = async userId => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error('User not found!');
    }
    if (!user.accounts || user.accounts.length === 0) {
      const defaultAccounts = [
        { accountId: `${Date.now()}-1`, title: 'Compte Courant', amount: 0 },
        { accountId: `${Date.now()}-2`, title: 'Compte Épargne', amount: 0 },
        { accountId: `${Date.now()}-3`, title: 'Compte Investissement', amount: 0 }
      ];
      return await this.addDefaultAccounts(userId, defaultAccounts);
    }
    return user.accounts;
  } catch (error) {
    console.error('Error in userService.js', error);
    throw new Error(error);
  }
};

module.exports.addDefaultAccounts = async (userId, defaultAccounts) => {
  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { $set: { accounts: defaultAccounts } },
      { new: true }
    );
    if (!user) {
      throw new Error('User not found!');
    }
    return user.accounts;
  } catch (error) {
    console.error('Error in userService.js', error);
    throw new Error(error);
  }
};

module.exports.updateUserProfile = async serviceData => {
  try {
    const jwtToken = serviceData.headers.authorization.split('Bearer')[1].trim()
    const decodedJwtToken = jwt.decode(jwtToken)
    const user = await User.findOneAndUpdate(
      { _id: decodedJwtToken.id },
      {
        userName: serviceData.body.userName
      },
      { new: true }
    )

    if (!user) {
      throw new Error('User not found!')
    }

    return user.toObject()
  } catch (error) {
    console.error('Error in userService.js', error)
    throw new Error(error)
  }
}