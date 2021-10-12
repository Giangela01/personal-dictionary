const mongoose = require("./connection")

const {
    Schema,
    model
} = mongoose

const wordsSchema = new Schema({
    Word: String,
    Log: String,
})
const Word = model("Word", wordsSchema);

module.exports = Word