const User = require("../models/user");
const Song= require("../models/song")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../utils/config');
const Preference = require("../models/preference");
const Playlist = require("../models/playList");
const song = require("../models/song");
const Comments = require("../models/comments");
const like = require("../models/like");

const userController = {
    // getData: (req, res) => {
    //     res.send('Hello World!!');
    // },
    register: async (req, res) => {
        try {
            // get the user inputs from the request body
            const { userName, name, email, password, preferedLang} = req.body;

            // check if the user already exists in the database
            const user = await User.findOne({ email });

            // if the user already exists, return an error
            if (user) {
                return res.status(400).send({ message: 'User already exists' });
            }

            // hash the password
            const hashedPassword = await bcrypt.hash(password, 10);

            // create a new user
            const newUser = new User({ userName, name, email, passwordHash: hashedPassword });

            console.log('body ', req.body)

            if(preferedLang){
                const newPerference = new Preference({lang:preferedLang});
                const savedPreference = await newPerference.save();
                // save the user to the database
                newUser.preference = savedPreference._id;
            }

            // save the user to the database
            const savedUser = await newUser.save();
        

            // return the saved user
            res.status(201).send({ message: 'Registration successful' });
        } catch (error) {
            res.send({ message: error.message })
        }
    },
    login: async (req, res) => {
        try {
            console.log(req.body)
            // get the user inputs from the request body
            const { email, password } = req.body;

            // check if the user exists in the database
            const user = await User.findOne({ email });

            // if the user does not exist, return an error
            if (!user) {
                return res.status(400).send({ message: 'User does not exist' });
            }

            // check if the password is correct
            const isPasswordCorrect = await bcrypt.compare(password, user.passwordHash);

            // if the password is incorrect, return an error
            if (!isPasswordCorrect) {
                return res.status(400).send({ message: 'Invalid password' });
            }

            // create a token
            const token = jwt.sign({ id: user._id }, JWT_SECRET);

            //  set a cookie with the token
            res.cookie('token', token, {
                httpOnly: true,
                sameSite: 'none',
                secure: true,
                expires: new Date(new Date().getTime() + 24 * 60 * 60 * 1000)  // 24 hours from now
            });

            // return the user
            res.status(200).send({ message: 'Login successful', user: user });

        } catch (error) {
            res.send({ message: error.message })
        }
    },

    logout: async (req, res) => {
        try {
            const userId = req.userId;

            if (!userId) {
                return res.status(400).send({ message: 'User not authenticated' });
            }

            // clear the cookie
            res.clearCookie('token');

            // return the user
            res.status(200).send({ message: 'Logout successful' });

        } catch (error) {
            res.send({ message: error.message })
        }
    },

    savePreference: async (req, res) => {
        try {
            // get the user id from the request parameters
            const { email,artist,lang} = req.body;
            
            // check if the user exists in the database
            const user = await User.findOne({ email });

            if (!user) {
                return res.status(400).send({ message: 'User does not exist' });
            }

            const newPerference = new Preference({artist,lang});
            const savedPreference = await newPerference.save();
            // save the user to the database
            user.preference = savedPreference._id;
            const savedUser = await user.save() 
            
            // return the user
            res.send({ message: "user save preference successfully" });

        } catch (error) {
            res.send({ message: error.message })
        }
    },

    savePlaylist: async (req, res) => {
        try {
            // get the user id from the request parameters
            const { email,playList,songNames } = req.body;
            
            // check if the user exists in the database
            const user = await User.findOne({ email });

            if (!user) {
                return res.status(400).send({ message: 'User does not exist' });
            }

            const exisitingPlayList = await Playlist.findOne({ playList });

            if (exisitingPlayList) {
                return res.status(400).send({ message: 'Playlist with same name already exists' });
            }

            const newPlaylist = new Playlist({playList,songNames});
            newPlaylist.user=user._id;
            const savedPlaylist=await newPlaylist.save();
            user.playList.push(savedPlaylist);
            const savedUser = await user.save() 
            const playLists = await savedUser.populate('playList');
            
            // const savedPlaylist = await newPlaylist.save();
            // save the user to the database
            // user.playList = savedPlaylist._id;
            // const savedUser = await user.save() 
            
            // return the user
            res.send({ message: "user play list successfully", playList: playLists });

        } catch (error) {
            res.send({ message: error.message })
        }
    },

    getAllPlaylist: async (req, res) => {
        try {

            // find the user by id
            const { email } = req.body;
            
            // check if the user exists in the database
            const playList = await User.findOne({ email }).populate('playList');

            if (!playList) {
                return res.status(400).send({ message: 'User does not exist' });
            }

            res.status(200).send({ message: 'All Playlists fetched', playList: playList });

        } catch (error) {
            res.send({ message: error.message })
        }
    },

    getLangPreference: async (req, res) => {
        try {

            // find the user by id
            const song = await Song.distinct("lang");

            res.status(200).send({ message: 'Preference set', song: song });

        } catch (error) {
            res.send({ message: error.message })
        }
    },

    

    getUser: async (req, res) => {
        try {
            // get the user id from the request parameters
            const userId = req.params.id;

            // find the user by id
            const user = await User.findById(userId);

            // if the user does not exist, return an error
            if (!user) {
                return res.send({ message: 'User does not exist' });
            }

            // return the user
            res.send({ message: 'User', user });

        } catch (error) {
            res.send({ message: error.message })
        }
    },


    // updateUser: async (req, res) => {
    //     try {
    //         // get the user id from the request parameters
    //         const userId = req.params.id;

    //         // get the user inputs from the request body
    //         const { name, email } = req.body;

    //         // find the user by id
    //         const user = await User.findById(userId);

    //         // if the user does not exist, return an error
    //         if (!user) {
    //             return res.send({ message: 'User does not exist' });
    //         }

    //         // update the user profile
    //         user.name = name || user.name;
    //         user.email = email || user.email;

    //         // save the user to the database
    //         const updatedUser = await user.save();

    //         // return the updated user profile
    //         res.send({ message: 'User updated successfully', user: updatedUser });

    //     } catch (error) {
    //         res.send({ message: error.message })
    //     }
    // },

    // deleteUser: async (req, res) => {
    //     try {
    //         // get the user id from the request parameters
    //         const userId = req.params.id;

    //         // find the user by id and delete
    //         const deletedUser = await User.findByIdAndDelete(userId);

    //         // if the user does not exist, return an error
    //         if (!deletedUser) {
    //             return res.send({ message: 'User does not exist' });
    //         }

    //         // return the deleted user
    //         res.send({ message: 'User deleted successfully', user: deletedUser });

    //     } catch (error) {
    //         res.send({ message: error.message })
    //     }
    // },
    checkAuth: async (req, res) => {
        try {
            // get the token from the request cookies
            const token = req.cookies.token;

            // if the token does not exist, return an error
            if (!token) {
                return res.status(401).send({ message: 'Access denied' });
            }

            // verify the token
            try {
                const decoded = jwt.verify(token, JWT_SECRET);
                return res.status(200).send({ message: 'Valid token' });
            } catch (error) {
                return res.status(401).send({ message: 'Invalid token' });
            }
        } catch (error) {
            res.status(500).send({ message: error.message });
        }
    },

    saveSongInPlaylist: async (req, res) => {
        try {
            // get the user id from the request parameters
            const { email,playList,songNames } = req.body;
            
            // check if the user exists in the database
            const user = await User.findOne({ email });

            if (!user) {
                return res.status(400).send({ message: 'User does not exist' });
            }

            const exisitingPlayList = await Playlist.findOne({ playList });

            if (!exisitingPlayList) {
                return res.status(400).send({ message: 'Playlist doesn\'t exist' });
            }

            if(exisitingPlayList.songNames) {
                const alreadyExists = exisitingPlayList.songNames.find(song=>song === songNames);
                if(alreadyExists) {
                    return res.status(400).send({ message: 'Song already exists in this Playlist' });
                }
            }

            exisitingPlayList.songNames.push(songNames)
            const savedPlaylist=await exisitingPlayList.save();
            
            // const savedPlaylist = await newPlaylist.save();
            // save the user to the database
            // user.playList = savedPlaylist._id;
            // const savedUser = await user.save() 
            
            // return the user
            res.send({ message: "user play list successfully", playList: savedPlaylist });

        } catch (error) {
            res.send({ message: error.message })
        }
    },

    deletePlaylist: async (req, res) => {
        try {
            // get the user id from the request parameters
            const { songName, selectedPlaylist, email } = req.body;
            
            // check if the user exists in the database
            const user = await User.findOne({ email });

            if (!user) {
                return res.status(400).send({ message: 'user doesn\'t exist' });
            }

            const playList = await Playlist.findOne({user: user._id, playList: selectedPlaylist})
            const deletedIndex = playList.songNames.indexOf(songName)

            if(deletedIndex != -1) {
                playList.songNames.splice(deletedIndex,1)
                const savedPlayList = await playList.save()
                res.status(200).send({ message: "user play list deleted successfully", playList:savedPlayList});
            }
          
            // const savedPlaylist = await newPlaylist.save();
            // save the user to the database
            // user.playList = savedPlaylist._id;
            // const savedUser = await user.save() 
            
            // return the user
            

        } catch (error) {
            res.status(400).send({ message: error.message })
        }
    },

    saveComments: async (req, res) => {
        try {
            // get the user id from the request parameters
            const { userName,song,comments,likes } = req.body;
            
            const comment = new Comments({users:userName, song:song, comments: comments})

            const savedComments = await comment.save()


            const allComments = await Comments.find({song:song}).sort({ createdAt: 'desc' })
            // return the user
            res.send({ message: "comments saved successfully", savedComments: savedComments, allComments:allComments });

        } catch (error) {
            res.send({ message: error.message })
        }
    },

    getAllComments: async (req, res) => {
        try {
            // get the user id from the request parameters
            const { songName } = req.body;
            const comment = await Comments.find({song:songName}).sort({ createdAt: 'desc' })

           
            res.send({ message: "all comments are fetched successfully", allComments:comment });

        } catch (error) {
            res.send({ message: error.message })
        }
    },

    saveLikes: async (req, res) => {
        try {
            // get the user id from the request parameters
            const { song,likes } = req.body;
            
            const existingLikes = await like.findOne({song:song})

            if(existingLikes) {
                existingLikes.like=likes
                await existingLikes.save()
            } else {
                const liked = new like({song:song, like: likes})

                const savedLikes = await liked.save()
            }




            const allLikes= await like.find({song:song})
            // return the user
            res.send({ message: "likes saved successfully", allLikes:allLikes });

        } catch (error) {
            res.send({ message: error.message })
        }
    },

    getAllLikes: async (req, res) => {
        try {
            // get the user id from the request parameters
            const { song } = req.body;
            const allLikes = await like.find({song:song})

           
            res.send({ message: "all likes are fetched successfully", allLikes:allLikes });

        } catch (error) {
            res.send({ message: error.message })
        }
    },
}

module.exports = userController;