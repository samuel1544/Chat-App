const express = require('express');
const app = express();
const client = require('./routes/client');
const multer = require('multer');
const path = require('path');

const Imap = require('imap');
const simpleParser = require('simple-parser');

const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(
    express.urlencoded({
        extended: true
    })
);

/**/ 
// Configuration IMAP
const imapConfig = {
    user: 'samuel.charlessamuel03@gmail.com',
    password: 'tvrjzwibkfoyakdf',
    host: 'imap.gmail.com',
    port: 993,
    tls: true,
    tlsOptions: { rejectUnauthorized: false },
  };
  
  // Route pour récupérer les e-mails
  app.get('/emails', (req, res) => {
    const imap = new Imap(imapConfig);
  
    imap.once('ready', () => {
      imap.openBox('INBOX', false, (err, box) => {
        if (err) {
          res.status(500).send({ error: 'Impossible de se connecter à la boîte de réception.' });
          return;
        }
  
        const fetchOptions = {
          bodies: ['HEADER', 'TEXT'],
          markSeen: false
        };
  
        const emails = [];
  
        imap.search(['UNSEEN'], (searchErr, results) => {
          if (searchErr) {
            res.status(500).send({ error: 'Erreur lors de la recherche des e-mails non lus.' });
            return;
          }
  
          const fetch = imap.fetch(results, fetchOptions);
  
          fetch.on('message', (msg, seqno) => {
            const email = {};
  
            msg.on('body', (stream, info) => {
              simpleParser(stream, (parseErr, parsed) => {
                if (parseErr) {
                  res.status(500).send({ error: 'Erreur lors de l\'analyse de l\'e-mail.' });
                  return;
                }
  
                email.subject = parsed.subject;
                email.from = parsed.from;
                email.text = parsed.text;
              });
            });
  
            msg.on('end', () => {
              emails.push(email);
            });
          });
  
          fetch.once('error', () => {
            res.status(500).send({ error: 'Erreur lors de la récupération des e-mails.' });
          });
  
          fetch.once('end', () => {
            imap.end();
            res.send(emails);
          });
        });
      });
    });
  
    imap.once('error', () => {
      res.status(500).send({ error: 'Erreur lors de la connexion au serveur IMAP.' });
    });
  
    imap.connect();
  });

/**/ 

app.get('/',(req, res) =>{
    res.json({message:"ok"});
    
});
// app.use('/images', express.static(path.join(__dirname, 'images')), client)
app.use('/client', client);

// app.use('/test', test);

module.exports = app;