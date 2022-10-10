const Genre = require('../models/genre')
const Book = require('../models/book')
const async = require('async')



exports.genre_list = (req,res) => {
    Genre.find()
    .sort([['name','ascending']])
    .exec(function(err,genreList){
        if(err){
            return next(err)
        }
        res.render('genre_list',{
            title: 'List of Genres',
            genre_list: genreList
        })
    })
    
}

exports.genre_detail = (req,res,next) => {
    async.parallel({
         genre : function(callback){
            Genre.findById(req.params.id)
            .exec(callback)
        },
        genre_books : function(callback){
            Book.find({genre : req.params.id})
            .exec(callback)
        }
    },function(err,results){
        if(err){
            return next(err)
        }
        if(results.genre === null){
            const genErr = new Error('Genre not found')
            genErr.status = 404
            return next(genErr)
        }
        res.render('genre_detail',{
            title: 'Genre Detail',
            genre: results.genre,
            genre_books: results.genre_books
        })
    })
    
}

exports.genre_create_get = (req,res) => {
    res.send('Not Implemented: Genre create GET');
}

exports.genre_create_post = (req,res) => {
    res.send('Not Implemented: Genre create POST');
}

exports.genre_delete_get = (req,res) => {
    res.send('Not Implemented: Genre delete GET');
}

exports.genre_delete_post = (req,res) => {
    res.send('Not Implemented: Genre delete POST');
}

exports.genre_update_get = (req,res) => {
    res.send('Not Implemented: Genre update GET');
}

exports.genre_update_post = (req,res) => {
    res.send('Not Implemented: Genre update POST');
}