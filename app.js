const express = require("express");
const accounts = require("./accounts");
const app = express();

app.use(express.json());

//Fetch Accounts**
app.get("/accounts", (req, res) => {
  res.status(200).json(accounts);
});

//Create Account**
let id = 1; // initialize an id counter

app.post("/accounts", (req, res) => {
  const id = Date.now(); // generate a unique id
  const newAccount = { id, username: req.body.username, funds: 0 };
  accounts.push(newAccount);
  res.status(201).json(newAccount);
});

//Delete Account**
app.delete("/accounts/:accountId", (req, res) => {
  const accountId = req.params.accountId;
  const accountIndex = accounts.findIndex(
    (account) => account.id === accountId
  );
  if (accountIndex === -1) {
    res.status(404).json({ message: "not found" });
  } else {
    accounts.splice(accountIndex, 1);
    res.status(204).json({}); // no content
  }
});

//Update Account**
app.put("/accounts/:accountId", (req, res) => {
  const accountId = req.params.accountId;
  const accountIndex = accounts.findIndex(
    (account) => account.id === accountId
  );
  if (accountIndex === -1) {
    res.status(404).json({ message: "not found" });
  } else {
    accounts[accountIndex] = { ...accounts[accountIndex], ...req.body };
    res.status(200).json(accounts[accountIndex]);
  }
});

//Challenges**

//Retrieve a single account**
app.get("/accounts/username/:username", (req, res) => {
  const username = req.params.username;
  const account = accounts.find(
    (account) => account.owner.username === username
  );

  if (!account) {
    res.status(404).json({ message: "not found" });
  } else {
    res.status(200).json(account);
  }
});

//Query Parameters**
app.get("/accounts/username/:username", (req, res) => {
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
});

app.listen(8000, () => {
  console.log("Server is Running on port 8000");
});
