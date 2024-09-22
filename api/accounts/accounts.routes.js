const express = require("express");
const {
  getAllAccounts,
  creatAccounts,
  deleteAccount,
  updateAccounts,
  getOneAccount,
  getCurrency,
} = require("./accounts.controllers");
const accounRouter = express.Router();

//Fetch Accounts**route
accounRouter.get("/api/accounts", getAllAccounts);

//Challenges**
//Create Account**
accounRouter.post("/api/account", creatAccounts);

//Retrieve a single account**
accounRouter.get("/account/username/:id", getOneAccount);

//Delete Account**
accounRouter.delete("/api/account/:id", deleteAccount);

//Update Account**
accounRouter.put("/account/:accountId", updateAccounts);

//Challenges**

//Query Parameters**
accounRouter.get("/accounts/username/:username", getCurrency);

module.exports = accounRouter;
