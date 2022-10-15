const BookInstance = require('../models/bookinstance');
const Book = require('../models/book');
const {body, validationResult} = require('express-validator');



exports.bookinstance_list = (req,res,next) => {
    BookInstance.find()
    .populate('book')
    .exec(function(err,instanceList){
        if(err){
            return next(err)
        }
        res.render('bookinstance_list',{
            title: "List of Book Copies",
            bookinstance_list: instanceList
        })

    })
}

exports.bookinstance_detail = (req,res,next) => {
    BookInstance.findById(req.params.id)
    .populate('book')
    .exec(
        function bookDetail(err,bookinstance){
            if(err){
                return next(err)
            }
            if(bookinstance === null){
                const genErr = new Error('Book copy not found')
                genErr.status = 404
                return next(genErr)
            }
            res.render('bookinstance_detail',{
                title: `Copy: ${bookinstance.book.title}`,
                bookinstance
            })
        }
    )
    
    
}

exports.bookinstance_create_get = (req,res,next) => {
    Book.find({},'title').exec((err,books) => {
        if(err){
            return next(err)
        }
        res.render('bookinstance_form',{
            title: 'Create Book Copy',
            book_list: books

        })
    })
   
}

exports.bookinstance_create_post = [
    body('book', 'book must be specified')
    .trim()
    .isLength({min: 1})
    .escape(),
    body('imprint', 'Imprint must be specified')
    .trim()
    .isLength({min: 1})
    .escape(),
    body('status').escape(),
    body('due_back', 'Invalid Date')
    .optional({checkFalsy: true})
    .isISO8601()
    .toDate(),

    function saveBookCopy(req,res,next){
        const errors = validationResult(req)
        const bookInstance = new BookInstance({
            book: req.body.book,
            imprint: req.body.imprint,
            status: req.body.status,
            due_back: req.body.due_back
        })
        if(!errors.isEmpty()){
            Book.find({},'title').exec(function backToForm(err,books){
                if(err){
                    return next(err)
                }

                res.render('bookinstance_form',{
                    title: 'Create Book Copy',
                    book_list: books,
                    selected_book: bookInstance.book._id,
                    errors: errors.array(),
                    bookinstance: bookInstance
                })
            })
            return
        }

            bookInstance.save((err)=>{
                if(err){
                    return next(err)
                }
                res.redirect(bookInstance.url)
            })
    }
]

exports.bookinstance_delete_get = (req,res) => {
    res.send('Not Implemented: Bookinstance delete GET');
}

exports.bookinstance_delete_post = (req,res) => {
    res.send('Not Implemented: Bookinstance delete POST');
}

exports.bookinstance_update_get = (req,res) => {
    res.send('Not Implemented: Bookinstance update GET');
}

exports.bookinstance_update_post = (req,res) => {
    res.send('Not Implemented: Bookinstance update POST');
}