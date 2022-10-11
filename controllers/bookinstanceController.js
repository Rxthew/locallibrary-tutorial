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