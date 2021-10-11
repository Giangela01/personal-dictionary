
require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const methodOverride = require("method-override");
// const wordRouter = require("./controllers/word");
// const UserRouter = require("./controllers/user");
const mongoose = require ('mongoose')
const session = require('express-session');
const MongoStore = require('connect-mongo');
const app = express()
const MONGODB_URI = process.env.MONGODB_URI

//middleware
app.use(morgan("tiny"))
app.use(methodOverride("_method")) 
app.use(express.urlencoded({
    extended: true
}))
app.use(express.static("public"))
app.use(session({
    secret: process.env.SECRET,
    store: MongoStore.create({mongoUrl: process.env.DATABASE_URL}),
    saveUninitialized: true,
    resave: false,
}))
// app.use("/words", wordRouter)
// app.use("/user", UserRouter)


// Routes
app.get("/", (req, res) => {
    res.send("index.ejs")
})



const PORT = process.env.PORT
app.listen(PORT, () => console.log(`On port ${PORT}`))