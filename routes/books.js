var express = require("express");
const mongoose = require("mongoose");
const Book = require("../models/books_models");
var router = express.Router();

/* GET books listing. */
router.get("/", function(req, res) {
  Book.find({}, function(err, books) {
    if (err) throw err;
    res.json({ message: "respond with all books", books: books });
  });
});

router.get("/", function(req, res) {
  Book.find({})
    .then(function(books) {
      res.json({ message: "respond with all books", books: books });
    })
    .catch(function(err) {
      res.json(err);
    });
});

router.get("/", async function(req, res) {
  const books = await Book.find({});

  try {
    res.json({ message: "respond with all books", books: books });
  } catch (err) {
    res.json(err);
  }
});

router.get("/:id", function(req, res) {
  Book.findById(req.params.id, function(err, book) {
    if (err) throw err;
    res.json({ message: `get book with id ${book}` });
  });
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
  Book.findByIdAndUpdate(req.params.id, { title: req.body.Title }, function(
    err,
    book
  ) {
    if (err) throw err;
    res.json({ message: `update book with id ${req.params.id}` });
  });
});

router.delete("/:id", function(req, res) {
  Book.findByIdAndRemove(req.params.id, function(err, book) {
    if (err) throw err;
    res.json({ message: `delete book with id ${req.params.id}` });
  });
});

module.exports = router;
