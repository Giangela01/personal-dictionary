
const mongoose = require("./connection");
const Word = require("./word")

mongoose.connection.on("open", () => {

  const wordLog = [{
    word: "test1",
    log: "testing testing",
},
{
    word: "test2",
    log: "testing",
},
]

  Word.remove({}, (err, data) => {

    Word.create(wordLog, (err, data) => {
      console.log("--------Word LOGGED----------");
      console.log(data);
      console.log("--------Word LOGGED----------");
      mongoose.connection.close();
    });
  });

});