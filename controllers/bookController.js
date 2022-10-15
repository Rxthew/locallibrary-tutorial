const Book = require('../models/book');
const Author = require('../models/author');
const Genre = require('../models/genre');
const BookInstance = require('../models/bookinstance');
const {body, validationResult} = require('express-validator');



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

exports.book_detail = (req,res,next) => {
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

exports.book_create_get = (req,res,next) => {
    async.parallel({
        authors: function(callback){
            Author.find(callback)
        },
        genres: function(callback){
            Genre.find(callback)
        }
    }, function renderBook(err,results){
        if(err){
            return next(err)
        }
        res.render('book_form',{
            title: 'Create Book',
            authors: results.authors,
            genres: results.genres
        })
    })
}

exports.book_create_post = [
    function genreArray(req,res,next){
        if(!Array.isArray(req.body.genre)){
            let genreBody = req.body.genre
            req.body.genre = typeof genreBody === 'undefined' ? [] : [genreBody]
        }
        next()
    },
    body('title','Title must not be empty.')
    .trim()
    .isLength({min: 1})
    .escape(),
    body('summary','Summary must not be empty.')
    .trim()
    .isLength({min: 1})
    .escape(),
    body('isbn','ISBN must not be empty.')
    .trim()
    .isLength({min: 1})
    .escape(),
    body('genre.*').escape(),
    function saveBook(req,res,next){
        const errors = validationResult(req)
        const book = new Book({
            title: req.body.title,
            author: req.body.author,
            summary: req.body.summary,
            isbn: req.body.isbn,
            genre: req.body.genre
        })
        if(!errors.isEmpty()){
            async.parallel({
                authors: function(callback){
                    Author.find(callback)
                },
                genres: function(callback){
                    Genre.find(callback)
                }
            },function backToForm(err,results){
                if(err){
                    return next(err)
                }

                for(const genre of results.genres){
                    if(book.genre.includes(genre._id)){
                        genre.checked = 'true'
                    }
                }
                res.render('book_form',{
                    title: 'Create Book',
                    authors: results.authors,
                    genres: results.genres,
                    book : book,
                    errors: errors.array()
                })

            })
            return
        }

        book.save((err)=>{
            if(err){
                return next(err)
            }
            res.redirect(book.url)
        })
       

       
    }

]

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