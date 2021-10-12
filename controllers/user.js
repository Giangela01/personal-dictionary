const express = require("express");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const { application } = require("express");

const router = express.Router();

router.get("/signup", (req, res) => {
    res.render("user/signup.ejs")
})

module.exports = router;