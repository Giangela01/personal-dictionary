const express = require("express");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const { application } = require("express");

const router = express.Router();

router.get("/signup", (req, res) => {
    res.render("user/signup.ejs")
})

router.post("/signup", async (req, res) => {
   req.body.password = await bcrypt.hash(req.body.password, await bcrypt.genSalt(10))
   User.create(req.body, (err, user) => {
       console.log(user)
       res.redirect("/user/login")
   })

})

module.exports = router;