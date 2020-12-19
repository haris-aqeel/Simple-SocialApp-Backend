const mongoose = require('mongoose')



const postSchema = new mongoose.Schema({
    
    myFile: {
        type: String,
        required: true,
    },

    personalId: {
        type: String,
        required: true,
    },

    text: {
        type: String,
        required: true,
    },

    time: {
        type: String,
    }
});




const UserPosts = new mongoose.model("userPost", postSchema);

module.exports = UserPosts;