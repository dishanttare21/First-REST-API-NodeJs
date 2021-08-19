const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv/config');
const bodyParser = require('body-parser');
const cors = require('cors');

//MIDDLEWARES
app.use(cors());
app.use(bodyParser.json());

//Import ROUTES
const postsRoute = require('./routes/posts')

app.use('/posts',postsRoute);

//ROUTES
app.get('/',(req,res) => {
    res.send('We are home');
});


//Connect to DB
mongoose.connect(process.env.DB_CONNECTION,{ useNewUrlParser: true, useUnifiedTopology: true},() => {
    console.log('Connected to DB!');
})


//How do we listen to the server
app.listen(5000);