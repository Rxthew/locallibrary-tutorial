const Author = require('../models/author');
const Book = require('../models/book')
const async = require('async')

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
    res.send('Not Implemented: Author create GET');
}

exports.author_create_post = (req,res) => {
    res.send('Not Implemented: Author create POST');
}

exports.author_delete_get = (req,res) => {
    res.send('Not Implemented: Author delete GET');
}

exports.author_delete_post = (req,res) => {
    res.send('Not Implemented: Author delete POST');
}

exports.author_update_get = (req,res) => {
    res.send('Not Implemented: Author update GET');
}

exports.author_update_post = (req,res) => {
    res.send('Not Implemented: Author update POST');
}





