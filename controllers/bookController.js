const Book = require('../models/book');
const Author = require('../models/author');
const Genre = require('../models/genre');
const BookInstance = require('../models/bookinstance');

const async = require('async');


exports.index = (req,res) => {
    async.parallel(
        {
            bookCount: function(callback){
                Book.countDocuments({},callback)
            },
            bookInstanceCount : function(callback){
                BookInstance.countDocuments({},callback)
            },
            genreCount : function(callback){
                Genre.countDocuments({},callback)
            },
            authorCount : function(callback){
                Author.countDocuments({},callback)
            }
        },
        function(err,results){
            return res.render('index',{
                title: 'Local Library Home',
                error: err,
                data: results
            })
        }
    )
}

exports.book_list = (req,res) => {
    res.send('Not Implemented: Book list');
}

exports.book_detail = (req,res) => {
    res.send(`Not Implemented: Book detail: ${req.params.id}`);
}

exports.book_create_get = (req,res) => {
    res.send('Not Implemented: Book create GET');
}

exports.book_create_post = (req,res) => {
    res.send('Not Implemented: Book create POST');
}

exports.book_delete_get = (req,res) => {
    res.send('Not Implemented: Book delete GET');
}

exports.book_delete_post = (req,res) => {
    res.send('Not Implemented: Book delete POST');
}

exports.book_update_get = (req,res) => {
    res.send('Not Implemented: Book update GET');
}

exports.book_update_post = (req,res) => {
    res.send('Not Implemented: Book update POST');
}