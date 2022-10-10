const BookInstance = require('../models/bookinstance');

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

exports.bookinstance_detail = (req,res) => {
    res.send(`Not Implemented: Bookinstance detail: ${req.params.id}`);
}

exports.bookinstance_create_get = (req,res) => {
    res.send('Not Implemented: Bookinstance create GET');
}

exports.bookinstance_create_post = (req,res) => {
    res.send('Not Implemented: Bookinstance create POST');
}

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