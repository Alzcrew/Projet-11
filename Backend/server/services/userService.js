const User = require('../database/models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');

module.exports.createUser = async serviceData => {
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
};

module.exports.loginUser = async serviceData => {
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
};

module.exports.getUserProfile = async serviceData => {
  const jwtToken = serviceData.headers.authorization.split('Bearer ')[1].trim();
  const decodedJwtToken = jwt.decode(jwtToken);
  const user = await User.findOne({ _id: decodedJwtToken.id });
  if (!user) {
    throw new Error('User not found!');
  }
  return user.toObject();
};

module.exports.getAccounts = async userId => {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error('User not found!');
  }

  const testTransaction = {
    date: "09/10/23",
    description: "Golden Sun Bakery",
    amount: 100,
    balance: "100",
    type: "Crédit",
    category: "Food",
    note: "Lorem Ipsum"
  };

  let accountsUpdated = false;

  // Si l'utilisateur n'a pas de comptes, on en crée un par défaut
  if (!user.accounts || user.accounts.length === 0) {
    const defaultAccounts = [
      { 
        accountId: uuidv4(), 
        title: 'Compte Courant', 
        amount: 0,
        transactions: [testTransaction]
      }
    ];
    user.accounts = defaultAccounts;
    accountsUpdated = true;
  } else {
    // Sinon, on ajoute des transactions tests aux comptes existants qui n'en ont pas
    user.accounts.forEach(account => {
      if (!account.transactions || account.transactions.length === 0) {
        account.transactions = [testTransaction];
        accountsUpdated = true;
      }
    });
  }

  if (accountsUpdated) {
    await user.save();
  }

  return user.accounts;
};


module.exports.addDefaultAccounts = async (userId, defaultAccounts) => {
  const user = await User.findByIdAndUpdate(
    userId,
    { $set: { accounts: defaultAccounts } },
    { new: true }
  );
  if (!user) {
    throw new Error('User not found!');
  }
  return user.accounts;
};

module.exports.updateUserProfile = async serviceData => {
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
}

module.exports.getTransactions = async (userId, accountId) => {
  const user = await User.findById(userId);
  console.log("User:", user);  
  if (!user) {
    throw new Error('User not found!');
  }
  const account = user.accounts.find(acc => acc.accountId === accountId);
  console.log("Account:", account);
  if (!account || !account.transactions) {
    throw new Error('Transactions not found!');
  }
  console.log("Transactions:", account.transactions);
  console.log("Account:", account);
  return account.transactions;
};

module.exports.addTransaction = async (userId, accountId, transactionData) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error('User not found!');
  }
  const account = user.accounts.find(acc => acc.accountId === accountId);
  if (!account) {
    throw new Error('Account not found!');
  }
  account.transactions.push(transactionData);
  await user.save();
  return transactionData;
};

