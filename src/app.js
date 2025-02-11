const express = require("express");
require("dotenv").config({path: "./config/.env"});
const app = express();

// database connection
const db = require("../db/mongo");
db()

const port = process.env.PORT;



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
