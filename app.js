const express = require('express');
const session = require(`express-session`)
const dotenv = require("dotenv");
const bodyParser = require('body-parser');
const { default: mongoose } = require('mongoose');

const connectDB = require(`./models/connect_db`);
const user = require(`./routes/user_route`);
const login = require(`./routes/login_route`);
const signup = require(`./routes/signup_route`);
const logout = require(`./routes/logout_route`);
const admin = require('./routes/admin_route');

const app = express()
dotenv.config(); 

app.use(bodyParser.json());
app.use(session({

    resave:`true`,
    secret:process.env.SESSION_SEC,
    saveUninitialized:`true`,
    cookie:{
        sameSite: "strict"
    }
}));

//route middlewares
app.use('/user', user);
app.use(`/login`, login);
app.use(`/signup`, signup);
app.use(`/logout`, logout);
app.use('/admin', admin );

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

