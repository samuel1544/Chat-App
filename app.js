const express = require('express');
const app = express();
const client = require('./routes/client');
const multer = require('multer');
const path = require('path');

const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(
    express.urlencoded({
        extended: true
    })
);

app.get('/',(req, res) =>{
    res.json({message:"ok"});
    
});
// app.use('/images', express.static(path.join(__dirname, 'images')), client)
app.use('/client', client);

// app.use('/test', test);

module.exports = app;