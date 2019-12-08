const jwt = require('jsonwebtoken');

module.exports = function(req, res, next){
    const token = req.header('auth-token');
    if (!token) return res.status(401).send('Access Denied');//нет токена

    // То есть когда мы правильно заходим, токен добавляется в хэдер, где он будет доступен до конца сессии
    // Далее когда мы хотим создать private route, нужно проверять, правильный ли токен содержится в хэдере с помощью этой функции.

    try{
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        next();
    }catch(err){
        res.status(400).send('Invalid Token');
    }
}