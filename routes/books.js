var express = require("express");
const mongoose = require("mongoose");
const Book = require("../models/books_models");
var router = express.Router();

/* GET books listing. */
router.get("/", function(req, res) {
  res.json({ message: "respond with all books" });
});

router.get("/:id", function(req, res) {
  res.json({ message: `get book with id ${req.params.id}` });
});

router.post("/", function(req, res) {
  console.log(req.body);
  let newBook = new Book({
    title: "Hobbit"
  });
  newBook.save(function(err) {
    if (err) throw err;
    console.log("book saved");
  });

  res.json({ message: `create new book using data from ${req.body.body}` });
});

router.put("/:id", function(req, res) {
  res.json({ message: `update book with id ${req.params.id}` });
});

router.delete("/:id", function(req, res) {
  res.json({ message: `delete book with id ${req.params.id}` });
});

module.exports = router;
