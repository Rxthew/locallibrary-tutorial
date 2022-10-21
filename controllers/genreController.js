const Genre = require('../models/genre')
const Book = require('../models/book')
const async = require('async')
const {body, validationResult} = require('express-validator')
const { name } = require('ejs')



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
    res.render('genre_form',{title: 'Create Genre'})
}

exports.genre_create_post = [
    body('name','Genre name required')
    .trim()
    .isLength({min: 1})
    .escape(),

    (req,res,next) => {
        const errors = validationResult(req)
        const genre = new Genre({name: req.body.name})
        
        if(!errors.isEmpty()){
            res.render('genre_form', {
                title: 'Create Genre',
                errors: errors.array(),
                genre : genre

            })
            return
        }
        else{
            Genre.findOne({name: req.body.name}).exec((err,foundGenre)=>{
                if(err){
                    return next(err)
                }
                if(foundGenre){
                    res.redirect(foundGenre.url)
                }
                else{
                    genre.save((err)=>{
                        if(err){
                            return next(err)
                        }
                        res.redirect(genre.url)
                    })
                }
            })
        }
    }
]

exports.genre_delete_get = (req,res,next) => {
    async.parallel({
        genre : function(callback){
           Genre.findById(req.params.id)
           .exec(callback)
       },
       genre_books : function(callback){
           Book.find({genre : req.params.id})
           .exec(callback)
       }
   },function getDeleteGenreForm(err,results){
         if(err){
            return next(err)
         }
         if(results.genre == null){
            res.redirect('/catalog/genres')
         }
         res.render('genre_delete',{
            title: 'Delete genre',
            genres: results.genre,
            genre_books: results.genre_books
         })

   })
}

exports.genre_delete_post = (req,res,next) => {

    const doesGenreHaveBooks = function(genreBooks){
        if(genreBooks.length > 0){
            return true
        }
        else{
            return false
        }
        
    }

    const deleteGenre = function(){
        Genre.findByIdAndRemove(req.body.genreid, (err)=>{
            if(err){
                return next(err)
            }
        })
    }

    async.parallel({
        genre : function(callback){
           Genre.findById(req.params.id)
           .exec(callback)
       },
       genre_books : function(callback){
           Book.find({genre : req.params.id})
           .exec(callback)
       }
   },function deleteGenreProcess(err,results){
         if(err){
            return next(err)
         }
         if(doesGenreHaveBooks(results.genre_books)){
            res.render('genre_delete',{
                title: 'Delete genre',
                genres: results.genre,
                genre_books: results.genre_books
            })
         }
         else{
            deleteGenre()
            res.redirect('/catalog/genres')
         }

   })
}

exports.genre_update_get = (req,res) => {
    res.send('Not Implemented: Genre update GET');
}

exports.genre_update_post = (req,res) => {
    res.send('Not Implemented: Genre update POST');
}