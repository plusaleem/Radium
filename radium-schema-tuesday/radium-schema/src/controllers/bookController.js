const bookModel = require("../models/bookModel.js");
const mongoose = require("mongoose");
const authorModel = require("../models/authorModel.js");


// problem 1 Create books schema
const createBook = async function(req, res) {
    const book = req.body;
    if (book.author_id) {
        let savedBook = await bookModel.create(book);
        res.send({ msg: savedBook });
    } else {
        res.send("Please enter author ID")
    }
};

// Problem 2 Get chetan bhagat books
const getBooksByChetan = async function(req, res) {
    let books = await bookModel.find({ author_name: "Chetan Bhagat" }).select({ author_id: 1, _id: 0 });
    console.log(books)
    let idOfChetan = books[0].author_id;
    let booksOfChetan = await bookModel.find({ author_id: idOfChetan }).select({ name: 1 })
    res.send({ msg: booksOfChetan });
    console.log(booksOfChetan)
};


// get all books (This is for me)
const getAllBooks = async function(req, res) {
    let bookData = await bookModel.find()
    res.send({ msg: bookData })
};








module.exports.createBook = createBook;
module.exports.getBooksByChetan = getBooksByChetan;
module.exports.getAllBooks = getAllBooks