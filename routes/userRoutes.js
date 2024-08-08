// 1. create a router
const express = require('express');
const userRouter = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');

userRouter.get('/checkAuth', userController.checkAuth);

// 2. add routes
// userRouter.get('/', userController.getData);
userRouter.post('/register', userController.register);
userRouter.post('/login', userController.login);
userRouter.get('/logout', auth.verifyToken, userController.logout);
userRouter.get('/langPreference',userController.getLangPreference);
userRouter.post('/savePreference',auth.verifyToken, userController.savePreference);
userRouter.post('/savePlaylist',auth.verifyToken, userController.savePlaylist);
userRouter.post('/getAllPlaylist',auth.verifyToken, userController.getAllPlaylist);
userRouter.post('/saveSongInPlaylist',auth.verifyToken, userController.saveSongInPlaylist);
userRouter.post('/deletePlaylist',auth.verifyToken, userController.deletePlaylist);
userRouter.post('/saveComments',auth.verifyToken, userController.saveComments);
userRouter.post('/getAllComments',auth.verifyToken, userController.getAllComments);
userRouter.post('/saveLikes',auth.verifyToken, userController.saveLikes);
userRouter.post('/getAllLikes',auth.verifyToken, userController.getAllLikes);




// userRouter.get('/profile', auth.verifyToken, userController.getProfile);
// userRouter.put('/profile', auth.verifyToken, userController.updateProfile);
// userRouter.delete('/profile', auth.verifyToken, userController.deleteProfile);

//  admin routes
// userRouter.get('/admin/users', auth.verifyToken, auth.isAdmin, userController.getUsers);
userRouter.get('/users/:id', auth.verifyToken,userController.getUser);
// userRouter.put('/admin/users/:id', auth.verifyToken, auth.isAdmin, userController.updateUser);
// userRouter.delete('/admin/users/:id', auth.verifyToken, auth.isAdmin, userController.deleteUser);

// 3. export the router
module.exports = userRouter;