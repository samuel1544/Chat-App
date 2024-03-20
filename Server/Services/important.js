const Imap = require('imap');
const { simpleParser } = require('mailparser');
const  querries = require('./querries')

const imapConfig = {
  user: 'charles.tamba@ktm-digit-innov.com',
  password: '1544azebaze',
  host: 'imap.ionos.de',
  port: 993,
  tls: true,
  tlsOptions: { rejectUnauthorized: false },
};

async function getSpamMails() {
  return new Promise(async(resolve, reject) => {
    try {
      const imap = new Imap(imapConfig);
      const last = await querries.LastseqnoSpam;

      imap.once('ready', () => {
        imap.openBox('SPAM', false, () => {
          imap.search(['ALL'], (err, results) => {
            if (err) {
              console.error(err);
              reject(err);
              return;
            }

            if (results.length === 0) {
              console.log('No flagged messages found.');
              resolve([]); // Résoudre avec un tableau vide
              return;
            }

            const f = imap.fetch(results, { bodies: '' });

            const emails = [];

            f.on('message', (msg, seqno) => {
              if(last == ''){
                  
                msg.on('body', (stream, info) => {
                  simpleParser(stream, async (err, parsed) => {
                    if (err) {
                      console.error(err);
                      reject(err);
                      return;
                    }

                    const email = {
                      Email: seqno,
                      From: parsed.from.text,
                      To: parsed.to.text,
                      Cc: parsed.cc || '',
                      Date: parsed.date,
                      Subject: parsed.subject || '',
                      Text: parsed.text,
                      Html: parsed.html,
                      Attachments: parsed.attachments.map((attachment) => ({
                        Filename: attachment.filename,
                        ContentType: attachment.contentType,
                        Data: attachment.content,
                      })),
                      
                    };

                    console.log({ email: email.Email, From: email.From });
                    emails.push(email);
                    const add = await querries.AddSpam(email);
                  });
                });
              
            
            }else{
              if (seqno > last) {

                msg.on('body', (stream, info) => {
                  simpleParser(stream, async (err, parsed) => {
                    if (err) {
                      console.error(err);
                      reject(err);
                      return;
                    }

                    const email = {
                      Email: seqno,
                      From: parsed.from.text,
                      To: parsed.to.text,
                      Cc: parsed.cc || '',
                      Date: parsed.date,
                      Subject: parsed.subject,
                      Text: parsed.text,
                      Html: parsed.html,
                      Attachments: parsed.attachments.map((attachment) => ({
                        Filename: attachment.filename,
                        ContentType: attachment.contentType,
                        Data: attachment.content,
                      })),
                    };

                    console.log({ email: email.Email, From: email.From });
                    emails.push(email);
                    const add = await querries.AddSpam(email);
                  });
                });

            }
              }
            });

            f.once('error', (ex) => {
              console.error('An error occurred while fetching emails:', ex);
              reject(ex);
            });

            f.once('end', () => {
              console.log('Done fetching all messages!');
              imap.end();
              resolve(emails);
            });
          });
        });
      });

      imap.once('error', (err) => {
        console.error(err);
        reject(err);
      });

      imap.once('end', () => {
        console.log('Connection ended');
        resolve('connection ended');
      });

      imap.connect();
    } catch (ex) {
      console.error('An error occurred while connecting:', ex);
      reject(ex);
    }
  });
}


const autoconfig = require('autoconfig');

// Fonction pour trouver les paramètres de connexion IMAP
async function findImapSettings(domain) {
  autoconfig(domain, (error, config) => {
    if (error) {
      console.error('Erreur lors de la recherche des paramètres IMAP:', error);
    } else {
      const { incoming } = config;
      const imapConfig = {
        user: 'samuel.charlessamuel03@' + domain, // Votre adresse e-mail de domaine
        password: '1544azebaze', // Votre mot de passe e-mail de domaine
        host: incoming.server, // Serveur IMAP trouvé automatiquement
        port: incoming.port, // Port IMAP trouvé automatiquement
        tls: incoming.socketType === 'SSL' // Utiliser TLS pour la connexion sécurisée si le socketType est SSL
      };

      // Connexion au serveur IMAP avec les paramètres trouvés
      const imap = new Imap(imapConfig);
      imap.connect();

      // Gérer l'événement de connexion réussie
      imap.once('ready', () => {
        console.log('Connecté au serveur IMAP:', incoming.server);

        // Faire quelque chose avec la connexion IMAP

        // Fermer la connexion IMAP
        imap.end();
      })}})}

module.exports ={
  getSpamMails,
}