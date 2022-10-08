const Genre = require('../models/genre');

exports.genre_list = (req,res) => {
    res.send('Not Implemented: Genre list');
}

exports.genre_detail = (req,res) => {
    res.send(`Not Implemented: Genre detail: ${req.params.id}`);
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