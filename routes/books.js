var express = require("express");
const mongoose = require("mongoose");
const Book = require("../models/books_models");
var router = express.Router();

/* GET books listing. */
router.get("/", async function(req, res) {
  try {
    const books = await Book.find({});
    res.json({ message: "respond with all books", books: books });
  } catch (err) {
    res.json(err);
  }
});

router.get("/:id", async function(req, res) {
  try {
    const bookFound = await Book.findById(req.params.id);
    res.json({ message: bookFound });
  } catch (err) {
    res.json(err);
  }
});

router.post("/", async function(req, res) {
  let newBook = new Book({
    title: req.body.Title
  });
  try {
    await newBook.save();
    res.json({
      message: `create new book using data from ${req.body.Title}`
    });
  } catch (err) {
    res.json(err);
  }
});

router.put("/:id", async function(req, res) {
  try {
    const bookUpdate = await Book.findByIdAndUpdate(
      req.params.id,
      { title: req.body.Title },
      { new: true }
    );
    res.json({ message: bookUpdate });
  } catch (err) {
    res.json(err);
  }
});

router.delete("/:id", async function(req, res) {
  try {
    const bookDeleted = await Book.findByIdAndRemove(req.params.id);
    if (bookDeleted !== null) {
      res.json({ message: `Book deleted`, books: bookDeleted });
    } else {
      res.json({ message: "Book not found" });
    }
  } catch (err) {
    res.json(err);
  }
});

module.exports = router;
