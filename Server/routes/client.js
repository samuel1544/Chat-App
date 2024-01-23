//const { hashSync, genSaltSync } = require('bcrypt');
const express = require('express');
const client = require('../Services/client');
//const bro = require('../services/client.js')
const router = express.Router();


router.get('/all', async(req, res, next) =>{
    res.json(await client.getAll(req.body));
    
});

router.get('/name', async(req, res, next) =>{
    res.json(await client.getUserName(req.body));
    
});

router.get('/info', async(req, res, next) =>{
    res.json(await client.getUserInfo(req.body));
})

router.post('/add', async(req, res, next) =>{
    res.json(await client.ajoutClient(req.body));
})

router.post('/login', async(req, res, next) =>{
    res.json(await client.login(req.body));
})

router.get('/pass', async(req, res, next) =>{
    res.json(await client.getUserpassword(req.body));
})

router.post('/compare', async(req, res, next) =>{
    res.json(await client.compare(req.body));
})

module.exports = router;