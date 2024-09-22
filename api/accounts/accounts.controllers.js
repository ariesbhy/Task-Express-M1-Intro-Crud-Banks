const { response } = require("express");

const getAllAccounts = (req, res) => {
  return res.status(200).json({ data: accounts });
};

const creatAccounts = (req, res) => {
  let length = accounts.length;
  let newId = accounts[length - 1].id + 1;
  const newAccount = {
    id: newId,
    username: req.body.username,
    funds: 0,
  };
  accounts.push(newAccount);
  return res.status(201).json({
    message: "Added Account",
    data: accounts,
  });
};
const getOneAccount = (req, res) => {
  const { id } = req.params;
  const account = accounts.find((account) => {
    if (account.id == id) return true;
  });
  if (!account) {
    return response.status(404).json({ error: "Account not Found" });
  } else {
    return response.status(200).json({ data: account });
  }
};
const deleteAccount = (req, res) => {
  const { id } = req.params;

  const updateAccounts = accounts.filter((account) => {
    if (account.id != id) {
      return true;
    }
  });
  return response.status(200).json({ data: updateAccounts });
};

const updateAccounts = (req, res) => {
  const { id } = req.params;
  const accountFound = accounts.find((account) => {
    if (account.id == id) {
      return true;
    }
  });
  accountFound.major = request.body.major;
  return res.status(200).json({ data: accountFound });
};

const getCurrency = (req, res) => {
  const username = req.params.username;
  const currency = req.query.currency;
  const account = accounts.find(
    (account) => account.owner.username === username
  );

  if (!account) {
    res.status(404).json({ message: "not found" });
  } else {
    if (currency === "usd") {
      // Convert funds to USD (assuming the account has a `funds` property)
      const usdFunds = account.funds * 1.31; // example conversion rate
      res.status(200).json({ ...account, funds: usdFunds });
    } else {
      res.status(200).json(account);
    }
  }
};

module.exports = {
  getAllAccounts,
  creatAccounts,
  getOneAccount,
  deleteAccount,
  updateAccounts,
  getCurrency,
};
