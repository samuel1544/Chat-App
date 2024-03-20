//const { hashSync, genSaltSync } = require('bcrypt');
const express = require('express');
const client = require('../Services/client');
const test = require('../Services/test')
//const bro = require('../services/client.js')
const router = express.Router();
const querries = require('../Services/querries')
const sent = require('../Services/sent')
const deleted = require('../Services/deleted')
const spam = require('../Services/spam')



router.get('/all', async(req, res, next) =>{
    res.json(await client.getAll(req.body));
    
});

router.get('/refresh-inbox', async(req, res, next) =>{
    res.json(await test.getEmails());
    res.json(await querries.getInbox());
});
router.get('/refresh_db', async(req, res, next) =>{
    res.json(await querries.getInbox());
    res.json(await querries.getSent());
    res.json(await querries.getDeleted());
    res.json(await querries.getSpam());
});

router.get('/emails', async(req, res, next) =>{
    res.json(await test.getEmails());
    
});
router.get('/sent-mails', async(req, res, next) =>{
    res.json(await sent.getSentMails());
    
});router.get('/deleted-mails', async(req, res, next) =>{
    res.json(await deleted.getDeletedMails());
    
});
router.get('/spam-mails', async(req, res, next) =>{
    res.json(await spam.getSpamMails());
    
});
router.get('/numinbox', async(req, res, next) =>{
    res.json(await querries.NumSeenInbox());
    
});
router.get('/numsent', async(req, res, next) =>{
    res.json(await querries.NumSent());
    
});
router.post('/update/:seq', async(req, res, next) =>{
    res.json(await querries.ChangeInboxSeen(req.params.seq));
    
});
router.post('/delete/:table/:seq', async(req, res, next) =>{
    res.json(await querries.DeleteMail(req.params.table,req.params));
    
});
router.get('/inbox', async(req, res, next) =>{
    res.json(await querries.getInbox());
    
});
router.get('/sent', async(req, res, next) =>{
    res.json(await querries.getSent());
    
});
router.get('/spam', async(req, res, next) =>{
    res.json(await querries.getSpam());
    
});
router.get('/deleted', async(req, res, next) =>{
    res.json(await querries.getDeleted());
    
});

router.get('/emails2/:seq', async(req, res, next) =>{
    res.json(await test.getSeenEmails(req.params.seq));
    
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