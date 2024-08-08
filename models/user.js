const mongoose = require('mongoose');

// create a schema
const userSchema = new mongoose.Schema({
    userName: String,
    passwordHash: String,
    name: String,
    email: String,
    createdAt: {
        type: Date,
        default: Date.now
    },
    preference:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'preference'},
        
        playList:[{
            type: mongoose.Schema.Types.ObjectId, 
        ref: 'playList'
        }]
});

// create a model and export it

module.exports = mongoose.model('User', userSchema, 'users');