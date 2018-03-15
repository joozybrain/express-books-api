var express = require("express");
const mongoose = require("mongoose");
const Book = require("../models/books_models");
var router = express.Router();

/* GET books listing. */
router.get("/", function(req, res) {
  Book.find({}).exec(function(err, book) {
    if (err) throw err;
    res.json({ message: "respond with all books" + book });
  });
});

router.get("/:id", function(req, res) {
  res.json({ message: `get book with id ${req.params.id}` });
});

router.post("/", function(req, res) {
  let newBook = new Book({
    title: req.body.Title
  });

  newBook.save(function(err) {
    if (err) throw err;
    console.log("book saved");
  });

  res.json({ message: `create new book using data from ${req.body.Title}` });
});

router.put("/:id", function(req, res) {
  Book.findById(`${req.params.id}`, function(err, book) {
    if (err) throw err;
    book.title = req.body.Title;

    book.save(function(err) {
      if (err) throw err;
      res.json({ message: `update book with id ${req.params.id}` });
    });
  });
});

router.delete("/:id", function(req, res) {
  res.json({ message: `delete book with id ${req.params.id}` });
});

module.exports = router;
