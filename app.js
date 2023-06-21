const express = require('express');
const dotenv = require("dotenv");

const app = express()

dotenv.config();git

app.get('',(req, res)=>{
    res.send("app working")
})