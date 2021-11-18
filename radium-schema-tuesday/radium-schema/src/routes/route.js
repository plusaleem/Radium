const express = require('express');
const router = express.Router();
const authorModel = require("../models/authorModel")

const authorController = require("../controllers/authorController")
const bookController = require("../controllers/bookController")


router.get('/test-me', function(req, res) {
    res.send('My first ever api!')
});

router.post('/createAuthor', authorController.createAuthor);
router.get('/getAuthorData', authorController.getAuthorData);
router.post('/createBook', bookController.createBook);
router.get('/getBooksByChetan', bookController.getBooksByChetan);
router.get('/twoStates', authorController.twoStates);
router.get('/cost50to100', authorController.cost50to100);
router.get('/getAllBooks', bookController.getAllBooks)

module.exports = router;