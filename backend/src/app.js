const express = require("express");
const dotenv = require("dotenv")

const app = express();

app.use(express.json)
dotenv.config()

app.get("/", (req,res) => {
    res.send("hello dost")
});

module.exports = app