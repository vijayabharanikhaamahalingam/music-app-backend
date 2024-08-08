const mongoose = require('mongoose');

// create a schema
const preferenceSchema = new mongoose.Schema({

   
    lang: [String],
    // user:{
    // type: mongoose.Schema.Types.ObjectId, 
    // ref: 'users'}
});

// create a model and export it

module.exports = mongoose.model('preference', preferenceSchema, 'preference');