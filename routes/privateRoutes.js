const router = require('express').Router();
const verify = require('./verifyToken');
const User = require('../model/User');


router.get('/getUser', verify, (req, res) =>{

    // с помощью req.user можно достать id пользователя, т.к содержится, далее можно найти пользователя в базе данных с помощью User.findOne(id)
    // const userId = req.user;
    console.log(User.findOne({_id: req.user}));
    return User.findbyOne({_id: req.user})
});

module.exports = router;