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
            bookInstanceAvailableCount : function(callback){
                BookInstance.countDocuments({status: 'Available'},callback)
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

exports.book_list = function(req,res,next){
    Book.find({},'title author')
    .sort({title: 1})
    .populate('author')
    .exec(function(err,bookList){
        if(err){
            return next(err)
        }
        else{
            res.render('book_list',{title: 'Book List',book_list: bookList})
        }
    })
    
}

exports.book_detail = (req,res) => {
    async.parallel({
        book: function(callback){
            Book.findById(req.params.id)
            .populate('author')
            .populate('genre')
            .exec(callback)


        },
        book_instance: function(callback){
            BookInstance.find({book: req.params.id})
            .exec(callback)

        }
    },function(err,results){
        if(err){
            return next(err)
        }
        if(results.book === null){
            const genErr = new Error('Book not found')
            genErr.status = 404
            return next(genErr)
        }
        res.render('book_detail',{
            title: results.book.title,
            book: results.book,
            book_instances: results.book_instance
        })

    })
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