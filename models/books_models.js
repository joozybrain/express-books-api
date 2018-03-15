const mongoose = require("mongoose");

const booksSchema = mongoose.Schema({
  
  title: String,
  created: {
    type: Date,
    default: Date.now
  }
});

let Book = mongoose.model("Book", booksSchema);

module.exports = Book
