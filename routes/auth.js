const router = require('express').Router();
const User = require('../model/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {registerValidation, loginValidation}= require('../validation');
const verify = require('./verifyToken');
// const User = require('../model/User');

// validation



router.post('/register', async (req, res) =>{
    // Сначала нужно проверить данные от пользователя
    const {error} = registerValidation(req.body);

    if (error) return res.status(400).send(error.details[0].message);

    // Проверяем есть ли пользователь уже в базе данных
    const emailExist = await User.findOne({email:req.body.email});
    if(emailExist) return res.status(400).send('Email already exists');


    // Хэшируем пароли
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);


    // Здесь создается новый пользователь
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    });
    try{
        const savedUser = await user.save();
        res.send({user: user._id});
    } catch(err){
        res.status(400).send(err);
    }

    // console.log(user);

    // res.send('Register' + req.body.name + " " + req.body.password + " " + req.body.email);


});

// LOGIN

router.post('/login', async (req, res) => {
    // Проверяем данные 
    const {error} = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Проверяем на существование email в базе данных
    const user = await User.findOne({email:req.body.email});
    if(!user) return res.status(400).send('Email not found');

    // Проверяем на правильность пароля

    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).send('Invalid pass');

    // Дальше нужно сгенерировать токен JWT для сессии

    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
    res.header('auth-token', token).send(token);
    // res.send('Logged in!');

})



// Protected routes.




router.get('/getUser', verify, (req, res) =>{

    // с помощью req.user можно достать id пользователя, т.к содержится, далее можно найти пользователя в базе данных с помощью User.findOne(id)
    const userId = req.user; //в эту функцию заносится res из verifyToken, который принимает токен пользователя и вынимает из него id ну и верифицирует пользователя.
    console.log("User id : " + userId);
    // Здесь наверное надо еще из jwt токена достать id.

    // console.log(User.findOne({_id: req.user}));
    // console.log(req.headers);
    console.log("LOGGING USER: " + User.findOne({_id: req.user}));
    // res.send(User.findOne({_id: req.user.tree})); 

    // Посылаем обратно найденного пользователя.
    User.findOne({_id: req.user}, function(err, obj) {
        console.log(obj);
        res.send(obj);
    });

});




module.exports = router;