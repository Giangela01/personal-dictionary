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
// Routes
// router.get("/seed", (req, res) => {

//     const farmAnimals = [{
//             name: "Orange",
//             livestock: "Chicken",
//             utilization: "Meat",
//             readyToTransport: false
//         },
//         {
//             name: "Chocolate",
//             livestock: "Cow",
//             utilization: "Milk",
//             readyToTransport: false
//         },
//         {
//             name: "Shaun",
//             livestock: "Sheep",
//             utilization: "Wool",
//             readyToTransport: false
//         },
//         {
//             name: "Donald",
//             livestock: "Duck",
//             utilization: "Eggs",
//             readyToTransport: false
//         },
//     ]

//     Animal.remove({}, (err, data) => {
//         Animal.create(farmAnimals, (err, data) => {
//             res.json(data);
//         });
//     });
// });

router.get("/", (req, res) => {
    Word.find({
        username: req.session.username
    }, (err, words) => {
        res.render("words/index.ejs", {
            words
        })
    })
})


router.get('/new', (req, res) => {
    res.render("words/new.ejs")
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