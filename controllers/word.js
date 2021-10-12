const express = require("express")
const Word = require("../models/word")

const router = express.Router()
router.use((req, res, next) => {
    if (req.session.loggedIn) {
        next();
    } else {
        res.redirect("/user/login");
    }
});

router.get("/", (req, res) => {
    Word.find({
        username: req.session.username
    }, (err, words) => {
        res.render("words/index.ejs", {
            words
        })
    })
})


router.get('/savedwords', (req, res) => {
    res.render("words/saveword.ejs")
})

router.get("/:id/edit", (req, res) => {
    const id = req.params.id
    Word.findById(id, (err, word) => {
        res.render("words/edit.ejs", {
            word
        })
    })
})

router.delete("/:id", (req, res) => {
    const id = req.params.id
    Word.findByIdAndRemove(id, (err, word) => {
        res.redirect("/words")
    })
})

router.get("/:id", (req, res) => {
    const id = req.params.id
    Word.findById(id, (err, word) => {
        res.render("words/show.ejs", {
            word
        })
    })
})

module.exports = router