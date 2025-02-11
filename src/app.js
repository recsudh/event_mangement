const express = require("express");
require("dotenv").config({path: "./config/.env"});

// routes
const user_route= require("../routes/user")


// database connection
const db = require("../db/mongo");
db()


const app = express();


app.use(express.json())
app.use("/v1",user_route)

const port = process.env.PORT;



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
