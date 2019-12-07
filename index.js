const express = require('express');
const cors = require('cors');
const axios = require("axios");


const app = express();

app.use(cors());

// здесь возможно можно без then, axios просто может вернуть json, а не промис с его результатом.
app.get('/api', (req, res) => {
    axios.get('https://api.github.com/users/burani').then(response =>{
        res.json({user: response.data});
    })
})

const PORT = 4000;

app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));

