const Imap = require('imap');
const { simpleParser } = require('mailparser');
const querries = require('./querries')

const imapConfig = {
  user: 'charles.tamba@ktm-digit-innov.com',
  password: '1544azebaze',
  host: 'imap.ionos.de',
  port: 993,
  tls: true,
  tlsOptions: { rejectUnauthorized: false },
};

async function getDeletedMails() {
  return new Promise(async(resolve, reject) => {
    try {
      const imap = new Imap(imapConfig);
      const last = await querries.LastseqnoDelete()

      imap.once('ready', () => {
        imap.openBox('Papierkorb', false, () => {
          imap.search(['ALL'], (err, results) => {
            if (err) {
              console.error(err);
              reject(err);
              return;
            }

            if (results.length === 0) {
              console.log('No Deleted messages found.');
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
                    const add = await querries.AddDeleted(email);
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
                    const add = await querries.AddDeleted(email);
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

//getDeletedMails()


const autoconfig = require('autoconfig');

// Fonction pour trouver les paramètres de connexion IMAP
module.exports = {
  getDeletedMails,
}