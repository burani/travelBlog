const express = require('express');
const cors = require('cors');
// const axios = require("axios");
const mongoose = require("mongoose");
const dotenv = require('dotenv');



dotenv.config();

const app = express();

app.use(cors());


// Соединяемся с базой данных
mongoose.connect(process.env.DB_CONNECT, () => console.log("connected to db!"));





// Middlewares
app.use(express.json());





// здесь возможно можно без then, axios просто может вернуть json, а не промис с его результатом.
// app.get('/api', (req, res) => {
//     axios.get('https://api.github.com/users/burani').then(response =>{
//         res.json({user: response.data});
//     })
// })

//Import Routes
const authRoute = require('./routes/auth');
const postRoute = require('./routes/posts');

//Route middlewares

app.use('/api/user', authRoute);
app.use('/api/posts', postRoute);


const PORT = 4000;

app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));

