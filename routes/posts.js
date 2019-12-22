const router = require('express').Router();
const verify = require('./verifyToken');

// здесь с помощью middleware verify проверяется, вошел ли пользователь или нет. Нужно чтобы в хэдере содержался auth-token со значением токена.

router.get('/posts', verify, (req, res) =>{

    // с помощью req.user можно достать id пользователя, т.к содержится, далее можно найти пользователя в базе данных с помощью User.findOne(id)
    res.json({
        posts: {title: 'my first post', description: 'random data you shouldnt access without login'}
    });
});

module.exports = router;