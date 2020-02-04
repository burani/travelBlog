const mongoose = require('mongoose');


// Здесь потом нужно будет заменить user на нестед документ user, чтобы каждый раз не находить пользователя

const postSchema = new mongoose.Schema({
    // name: {
    //     type: String,
    //     required: true,
    //     max: 255,
    //     min: 6
    // },
    // email: {
    //     type: String,
    //     required: true,
    //     max: 255,
    //     min: 6
    // },
    // password: {
    //     type: String,
    //     required: true,
    //     max: 1024,
    //     min: 6
    // },
    // date: {
    //     type: Date,
    //     default: Date.now()
    // }
    
    title: {
        type: String,
        required: true,
        max: 32,
        min: 1
    },
    user: {
        type: String,
        required: true,
        max: 255,
        min: 6
    },
    text: {
        type: String,
        required: true,
    },
    postDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    eventDate: {
        type: Date,
        required: true,
    },
    eventLength: {
        type: String,
        required: true,
        max: 4,
        min: 1
    },
    category: {
        type: String,
        required: true,
        enum: ['camping', 'climbing', 'cycling', 'diving', 'hiking']
    },
    location: {
        type: String,
        required: true,
        max: 15,
        min: 1
    }
    
});

module.exports = mongoose.model('Post', postSchema);