const express = require("express");
const accounRouter = require("./api/accounts/accounts.routes");
const app = express(); //instance of express

app.use(express.json()); //app can recieve json info

app.use(accounRouter);

app.listen(8000, () => {
  console.log("Server is Running on port 8000");
});
