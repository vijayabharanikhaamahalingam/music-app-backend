const mongoose = require('mongoose');

// create a schema
const playListSchema = new mongoose.Schema({

    playList: String,
    songNames: [String],
    user:{
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'users'}
});

// create a model and export it

module.exports = mongoose.model('playList', playListSchema, 'playlist');