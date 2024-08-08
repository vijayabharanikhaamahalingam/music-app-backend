const express = require('express');
const songRouter = express.Router();
const songController = require('../controllers/songController');
const auth = require('../middleware/auth');

const userController = require('../controllers/userController');

songRouter.get('/checkAuth', userController.checkAuth);

songRouter.post('/songs', auth.verifyToken, songController.getSong);

module.exports = songRouter;