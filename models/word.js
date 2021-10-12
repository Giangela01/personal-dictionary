const mongoose = require("./connection")

const {
    Schema,
    model
} = mongoose

const wordsSchema = new Schema({
    searchedWord: String,
    partOfSpeech: String,
    definition: String,
    comment: String,
})
const Word = model("Word", wordsSchema);

module.exports = Word