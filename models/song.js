const mongoose = require('mongoose');

// create a schema
const songSchema = new mongoose.Schema({
    song_name: String,
    album: String,
    artist: String,
    genre: String,
    lang: String,
    link: String,
    image: String

});

// create a model and export it
module.exports = mongoose.model('Song', songSchema, 'songs');