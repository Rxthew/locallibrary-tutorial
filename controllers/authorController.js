const Author = require('../models/author');

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

exports.author_detail = (req,res) => {
    res.send(`Not Implemented: Author detail: ${req.params.id}`);
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





