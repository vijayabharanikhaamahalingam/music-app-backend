const mongoose = require('mongoose');

// create a schema
const commentsSchema = new mongoose.Schema({
   users:String,
   song:String,
   comments:String,
   totalLikes: Number,
   createdAt: {
    type: Date,
    default: Date.now
},
});

// create a model and export it

module.exports = mongoose.model('comments', commentsSchema, 'comments');