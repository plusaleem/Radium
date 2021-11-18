// You have to replicate the below data in your database.
// With this in mind, create a node application and APIs to do the following: 
//1. Write down the schemas for book and authors (keeping the data given below in mind).
// Also create the documents (corresponding to the data given below) in your database.
// 2. CRUD operations.
// Write API's to do the following: Write create APIs for both books and authors ---> 
//If author_id is not available then do not accept the entry(in neither the aurthor collection onr the books collection) 
//List out the books written by Chetan Bhagat find the author of “Two states” and update the book price to 100; Send back the author_name and updated price in response 
//Find the books which costs between 50-100(50,100 inclusive) and respond back with the author names of respective books

const authorModel = require("../models/authorModel.js")
const bookModel = require("../models/bookModel.js")
const mongoose = require('mongoose')


// Problem 1 create author data
const createAuthor = async function(req, res) {
    var authorData = req.body
    if (authorData.author_id) {
        let savedData = await authorModel.create(authorData)
        res.send({ msg: savedData })
    } else {
        res.send("Please input author ID")
    }
}

// problem 3 get author of two states & update book price to 100//
const twoStates = async function(req, res) {
    let authorID = await bookModel.findOne({ name: "Two states" }).select({ author_id: 1, _id: 0 })
    console.log(saved)

    let author = await authorModel.findOne(authorID).select({ author_name: 1, _id: 0 })

    let priceUpdate = await bookModel.findOneAndUpdate({ name: "Two states" }, { price: 100 }, { new: true }).select({ price: 1, _id: 0 })
        //findOneAndUpdate( filter, update, options )
    res.send({ msg: author, priceUpdate })
}


// Problem 4 Books between 50 to 100 and send back Author name-------------------------------
const cost50to100 = async function(req, res) {
    let book50to100 = await bookModel.find({ "prices": { $gte: 50, $lte: 100 } }).select({ author_id: 1 })
    console.log(book50to100)
    let len = book50to100.length;
    // console.log(len)
    let arr = [];
    for (let i = 0; i < len; i++) {
        let id = book50to100[i].author_id;
        // console.log(id)
        let bookInRange = await authorModel.find({ author_id: id }).select({ author_name: 1, _id: 0 })
        arr.push(bookInRange);
    }
    res.send({ msg: arr });
}



// get all authors // this is for me
const getAuthorData = async function(req, res) {
    let allAuthors = await authorModel.find()
    res.send({ msg: allAuthors })
}


module.exports.createAuthor = createAuthor
module.exports.getAuthorData = getAuthorData
module.exports.twoStates = twoStates
module.exports.cost50to100 = cost50to100