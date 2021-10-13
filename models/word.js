const mongoose = require("./connection")

const {
    Schema,
    model
} = mongoose

const wordsSchema = new Schema({
    word: String,
    log: String,
    time : { type : Date, default: Date.now },
})
const Word = model("Word", wordsSchema);

module.exports = Word