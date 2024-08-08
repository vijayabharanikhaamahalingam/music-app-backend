const Song= require("../models/song")
const User = require("../models/user");
const songController ={
    getSong: async (req, res) => {
        try { 
            const { email } = req.body;
            console.log(req.body)
            const preference = await User.findOne({ email }).populate("preference");
            console.log(preference);
            const songs = await Song.aggregate([
                {
                    $addFields :{ "placement":{$indexOfArray:[preference.lang,"$lang"]}}
                },{
                    $sort: {placement:1}
                }
            ]);
            res.send({ message: 'All songs', songs });
        } catch (error) {
            res.send({ message: error.message });
        }

    },
}
module.exports = songController;