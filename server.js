
require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const methodOverride = require("method-override");
// const wordRouter = require("./controllers/word");
// const UserRouter = require("./controllers/user")
const session = require('express-session');
const MongoStore = require('connect-mongo');
const app = express()
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

db.on('error', (err) => console.log(err.message + ' is mongod not running?'));
db.on('connected', () => console.log('mongod connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongod disconnected'));


// Routes
app.get("/", (req, res) => {
    res.send("index.ejs")
})



const PORT = process.env.PORT
app.listen(PORT, () => console.log(`On port ${PORT}`))