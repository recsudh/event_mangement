const express = require("express");
require("dotenv").config({path: "./config/.env"});

// routes
const user_route= require("../routes/user")
const event_route= require("../routes/event")
const manager_route= require("../routes/manager")


// database connection
const db = require("../db/mongo");
db()


const app = express();


app.use(express.json())
app.use("/v1",user_route)
app.use("/v1",event_route)
app.use("/v1",manager_route)

const port = process.env.PORT;



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
