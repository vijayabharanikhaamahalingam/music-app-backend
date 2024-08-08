const mongoose = require('mongoose');

// create a schema
const likeSchema = new mongoose.Schema({
   like:Number,
   song:String,
});

// create a model and export it

module.exports = mongoose.model('like', likeSchema, 'like');