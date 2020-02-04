const router = require('express').Router();
const verify = require('./verifyToken');
const Post = require('../model/Post');


// здесь с помощью middleware verify проверяется, вошел ли пользователь или нет. Нужно чтобы в хэдере содержался auth-token со значением токена.


// Достать все посты, здесь наверное надо убрать verify, просмотр доступен всем.
router.get('/getPosts', (req, res) =>{

    // с помощью req.user можно достать id пользователя, т.к содержится, далее можно найти пользователя в базе данных с помощью User.findOne(id)


    const pagination = req.query.pagination ? parseInt(req.query.pagination): 10;
    const page = req.query.page ? parseInt(req.query.page): 1;
    const type = req.query.type ? req.query.type: 'all';

    let totalAmount = 1;
    


    if (type == 'all'){



        Post.count({}, function(err, count){
            totalAmount = count;
        })

        Post.find({}, function(err, obj) {
            console.log(obj);
            res.send({posts: obj, totalPages: Math.ceil(totalAmount/pagination)});
        })
        .skip((page - 1) * pagination)
        .limit(pagination)
        .sort({createdAt: -1});
    } else{


        Post.count({"category": type}, function(err, count){
            totalAmount = count;
        })
        
        Post.find({"category": type}, function(err, obj) {
            console.log(obj);
            res.send({posts: obj, totalPages: Math.ceil(totalAmount/pagination)});
        })
        .skip((page - 1) * pagination)
        .limit(pagination)
        .sort({createdAt: -1});
    }

    
});

// router.get('/getPostAmount', (req, res) =>{

//     // с помощью req.user можно достать id пользователя, т.к содержится, далее можно найти пользователя в базе данных с помощью User.findOne(id)



//     Post.find({}, function(err, obj) {
//         console.log(obj);
//         res.send(obj);
//     })
//     .skip((page - 1) * pagination)
//     .limit(pagination)
//     .sort({createdAt: -1});
// });


// private routes

// Добавить новый пост
router.post('/addPost', verify, async (req, res) => {

    // Здесь может быть надо будет добавить проверку

    const post = new Post({
        title: req.body.title,
        user: req.body.user,
        text: req.body.text,
        eventDate: req.body.eventDate,
        eventLength: req.body.eventLength,
        category: req.body.category,
        location: req.body.location

    });
    // id генерируется автоматически, так что не надо добавлять уникальное поле.
    try{
        const savedPost = await post.save();
        res.send({post: post._id});
    } catch(err){
        res.status(400).send(err);
    }
})


router.get('/getUserPosts', verify, async(req, res) =>{

    


    const userId = req.user; //в эту функцию заносится res из verifyToken, который принимает токен пользователя и вынимает из него id ну и верифицирует пользователя.
    console.log("User id : " + JSON.stringify(userId));

    // Post.count({}, function(err, count){
    //     totalAmount = count;
    // })

    // Post.find({}, function(err, obj) {
    //     console.log(obj);
    //     res.send({posts: obj, totalPages: Math.ceil(totalAmount/pagination)});
    // })
    // .skip((page - 1) * pagination)
    // .limit(pagination)
    // .sort({createdAt: -1});

    Post.find({"user": userId._id}, function(err, obj) {
        console.log(obj);
        res.send(obj);
    })

    
});


router.delete('/deletePost', verify, async(req, res) =>{

    console.log(req.data);
    console.log(req.body);
    Post.deleteOne({"_id": req.body.id}, function(err) {
        if (!err) {
            res.status(200).send();
        }
        else {
            res.status(400).send();
        }
    })

    
});

router.put('/updatePost', verify, async(req, res) =>{

    console.log(req.body);
    
    Post.updateOne({"_id": req.body.id}, 
    {
        title: req.body.title,
        text: req.body.text,
        eventDate: req.body.eventDate,
        eventLength: req.body.eventLength,
        category: req.body.category,
    }, function(err) {
        if (!err) {
            res.status(200).send();
        }
        else {
            console.log(err);
            res.status(400).send();
        }
    })

    
});



module.exports = router;