const Author = require('../models/author');
const Book = require('../models/book')
const async = require('async')
const {body, validationResult} = require('express-validator')

exports.author_list = (req,res,next) => {
    Author.find()
    .sort([['family name','ascending']])
    .exec(function(err,authorList){
        if(err){
            return next(err)
        }
        res.render('author_list',{
            title: 'List of Authors',
            author_list: authorList
        })
    })
}

exports.author_detail = (req,res,next) => {
    async.parallel({
        author: function(callback){
            Author.findById(req.params.id)
            .exec(callback)


        },
        author_books: function(callback){
            Book.find({author: req.params.id},'title summary')
            .exec(callback)

        }
    },function(err,results){
        if(err){
            return next(err)
        }
        if(results.author === null){
            const genErr = new Error('Author not found')
            genErr.status = 404
            return next(genErr)
        }
        res.render('author_detail',{
            title: 'Author Detail',
            author: results.author,
            author_books: results.author_books
        })

    })
}

exports.author_create_get = (req,res) => {
    res.render('author_form',{title: 'Create Author'})
}

exports.author_create_post = [
    body('first_name')
    .trim()
    .isLength({min: 1})
    .escape()
    .withMessage('First name must be specified.')
    .isAlphanumeric()
    .withMessage('First name has non-alphanumeric characters.'),
    body('family_name')
    .trim()
    .isLength({min: 1})
    .escape()
    .withMessage('Family name must be specified.')
    .isAlphanumeric()
    .withMessage('Family name has non-alphanumeric characters.'),
    body('date of birth','Invalid date of birth')
    .optional({checkFalsy: true})
    .isISO8601()
    .toDate(),
    body('date of death','Invalid date of death')
    .optional({checkFalsy: true})
    .isISO8601()
    .toDate(),
    function saveAuthor(req,res,next){
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            res.render('author_form',{
                title: 'Create Author',
                author: req.body,
                errors: errors.array()
            })
            return
        }
        else{
            const author = new Author({
                first_name : req.body.first_name,
                family_name: req.body.family_name,
                date_of_birth: req.body.date_of_birth,
                date_of_death: req.body.date_of_death
            })
            author.save((err)=>{
                if(err){
                    return next(err)
                }
                res.redirect(author.url)
            })
        }
    }
]

exports.author_delete_get = (req,res,next) => {
    async.parallel(
        {
            author: function(callback){
                Author.findById(req.params.id).exec(callback)
            },
            author_books: function(callback){
                Book.find({author: req.params.id}).exec(callback)
            },
        }, 

        function getDeleteAuthorForm(err,results){
            if(err){
                return next(err)
            }
            if(results.author == null){
                res.redirect('/catalog/authors')
            }
            res.render('author_delete',{
                title: 'Delete author',
                author: results.author,
                author_books: results.author_books
            })

        }

    )
    
}

exports.author_delete_post = (req,res,next) => {

    const doesAuthorHaveBooks = function(authorBooks){
        if(authorBooks.length > 0){
            return true
        }
        else{
            return false
        }
        
    }

    const deleteAuthor = function(){
        Author.findByIdAndRemove(req.body.authorid, (err)=>{
            if(err){
                return next(err)
            }
        })
    }

    async.parallel({
        author: function(callback){
            Author.findById(req.params.id).exec(callback)
        },
        author_books: function(callback){
            Book.find({author: req.params.id}).exec(callback)
        },
    },

    function deleteAuthorProcess(err,results){
        if(err){
            return next(err)
        }
        if(doesAuthorHaveBooks(results.author_books)){
            res.render('author_delete',{
                title: 'Delete Author',
                authors: results.author,
                author_books: results.author_books
            })
        }
        else{
            deleteAuthor()
            res.redirect('/catalog/authors')
        }

    }
        
    )
}

exports.author_update_get = (req,res) => {
    res.send('Not Implemented: Author update GET');
}

exports.author_update_post = (req,res) => {
    res.send('Not Implemented: Author update POST');
}





