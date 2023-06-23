const express = require('express');
const connectDB = require(`./models/connect_db`);
const dotenv = require("dotenv");
const bodyParser = require('body-parser');
const { default: mongoose } = require('mongoose');

const app = express()
dotenv.config(); 

app.use(bodyParser.json)


app.get('',(req, res)=>{
    res.send(`landing page`);
});

connectDB();
mongoose.connection.once(`open`, ()=>{
    console.log('db connected');
    app.listen(process.env.PORT || 5000, ()=>{
        console.log(`server is running on ${process.env.PORT}`);
    });
});

/*INCLUDE {
    "start":"nodemon app.js" ............ in paclage.json
}
*/