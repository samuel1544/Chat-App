const fs = require('fs');
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



function getAllFolders(callback) {
  try{
    const connection = new Imap(imapConfig);

    connection.connect();
  
    connection.once('ready', () => {
      connection.getBoxes((err, boxes) => {
        if (err) {
          console.error(err);
          return callback(err);
        }
  
        const folderNames = Object.keys(boxes);
  
        console.log('Liste des dossiers :');
        console.log(folderNames);
  
        connection.end(); // Fermer la connexion IMAP
        callback(null, folderNames);
      });
    });
  
    connection.once('error', (err) => {
      console.error(err);
      callback(err);
    });
  }catch(err){
    console.log(err)
  }
  
}
getAllFolders((err, folderNames) => {
  
});

function getUsername() {
  const connection = new Imap(imapConfig);

  connection.connect();

  connection.once('ready', () => {
    connection.openBox('INBOX', false, (err, box) => {
      

      const username = connection._box.user;
      console.log('Nom d\'utilisateur :', username);

      connection.end(); // Fermer la connexion IMAP
     
    });
  });
  connection.once('error', (err) => {
    //console.error(err);
    
  });
}
//getUsername();

async function getEmails2() {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await getSeenEmails();
      const imap = new Imap(imapConfig);
      const last = await querries.LastseqnoInbox()
      let x;
      console.log(last)
      imap.once('ready', () => {
        imap.openBox('INBOX', false, () => {
          imap.search(['ALL'], (err, results) => {
            if (err) {
              console.error(err);
              reject(err);
              return;
            }
            if (results.length === 0) {
              console.log('Aucun e-mail trouvé');
              resolve([]);
              return;
            }
            
            const f = imap.fetch(results, { bodies: '' });

            const emails = [];
            
            

            f.on('message', (msg, seqno) => {
              if (seqno > 8) {
                const seen = data.some((email) => email.Email === seqno);

                if(seen == true){
                  msg.on('body', (stream, info) => {
                    simpleParser(stream, async (err, parsed) => {
                      if (err) {
                        console.error(err);
                        reject(err);
                        return;
                      }
  
                      imap.addFlags(seqno, ['\\Deleted'], (err) => {
                        if (err) {
                          console.error('Error marking email as deleted:', err);
                          reject(err);
                          return;
                        }})
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
                        Seen: 'true',
                      };
  
                      console.log({ email: email.Seen, From: email.From });
                      emails.push(email);
                     // const add = await querries.AddInbox(email);
                    });
                  });
                }else{
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
                        Seen: 'false',
                      };
  
                      console.log({ email: email.Seen, From: email.From });
                      emails.push(email);
                      //const add = await querries.AddInbox(email);
                    });
                  });
                }

                
              }
            });

            f.once('end', async () => {
              console.log('Récupération des e-mails terminée');
              resolve(emails);
            });
          });
        });
      });

      imap.once('error', (err) => {
        console.error(err);
        reject(err);
      });

      imap.connect();
    } catch (err) {
      console.error(err);
      reject(err);
    }
  });
}
//getEmails2();



function markEmailAsReadBySeq(seqno) {
  return new Promise((resolve, reject) => {
    const imap = new Imap(imapConfig);

    imap.once('ready', () => {
      imap.openBox('INBOX', false, (err, mailbox) => {
        if (err) {
          console.error('Erreur lors de l\'ouverture de la boîte de réception :', err);
          reject(err);
          return;
        }

        const flags = '\\Seen';

        imap.addFlags(seqno, flags, (err) => {
          if (err) {
            console.error('Erreur lors du marquage de l\'e-mail comme "vu" :', err);
            reject(err);
          } else {
            console.log('L\'e-mail a été marqué comme "vu" avec succès.');
            imap.end();
            resolve();
          }
        });
      });
    });

    imap.once('error', (err) => {
      console.error('Erreur de connexion IMAP :', err);
      reject(err);
    });

    imap.once('end', () => {
      console.log('Connexion IMAP terminée');
    });

    imap.connect();
  });
}
//markEmailAsReadBySeq(1)


function deleteEmailBySeq(seqno) {
  return new Promise((resolve, reject) => {
    const imap = new Imap(imapConfig);

    imap.once('ready', () => {
      imap.openBox('INBOX', false, (err, mailbox) => {
        if (err) {
          console.error('Erreur lors de l\'ouverture de la boîte de réception :', err);
          reject(err);
          return;
        }

        const flags = '\\Deleted';

        imap.addFlags(seqno, flags, (err) => {
          if (err) {
            console.error('Erreur lors de l\'ajout du drapeau de suppression à l\'e-mail :', err);
            reject(err);
          } else {
            imap.expunge(seqno, (err) => {
              if (err) {
                console.error('Erreur lors de la suppression de l\'e-mail :', err);
                reject(err);
              } else {
                console.log('L\'e-mail a été supprimé avec succès.');
                imap.end();
                resolve();
              }
            });
          }
        });
      });
    });

    imap.once('error', (err) => {
      console.error('Erreur de connexion IMAP :', err);
      reject(err);
    });

    imap.once('end', () => {
      console.log('Connexion IMAP terminée');
    });

    imap.connect();
  });
}
//deleteEmailBySeq(9)

async function deleteEmailByUid() {
  return new Promise((resolve, reject) => {
    const imap = new Imap(imapConfig);

    imap.once('ready', () => {
      imap.openBox('INBOX', false, (err) => {
        if (err) {
          console.error('Error opening mailbox:', err);
          reject(err);
          return;
        }

        imap.search(['SEQ', 2], (err, searchResults) => {
          if (err) {
            console.error('Error searching for email:', err);
            reject(err);
            return;
          }

          if (searchResults.length === 0) {
            console.log('Email not found.');
            resolve(); // No email found, resolve without error
            return;
          }

          imap.addFlags(searchResults, ['\\Deleted'], (err) => {
            if (err) {
              console.error('Error marking email as deleted:', err);
              reject(err);
              return;
            }

            console.log('Email marked as deleted!');

            imap.expunge(searchResults, (err) => {
              if (err) {
                console.error('Error expunging email:', err);
                reject(err);
                return;
              }

              console.log('Email deleted successfully!');
              imap.end(); // End connection after successful deletion
              resolve(); // Resolve the promise
            });
          });
        });
      });
    });

    imap.once('error', (err) => {
      console.error('Error connecting to IMAP server:', err);
      reject(err);
    });
  });
}
//deleteEmailByUid()
  

async function getEmails() {
  return new Promise(async (resolve, reject) => {
    try {
      const imap = new Imap(imapConfig);
      const data = await getSeenEmails();
      const last = await querries.LastseqnoInbox();
      console.log(last)

      imap.once('ready', () => {
        imap.openBox('INBOX', false, () => {
          imap.search(['ALL'], (err, results) => {
            if (err) {
              console.error(err);
              reject(err);
              return;
            }
            if (results.length === 0) {
              console.log('Nothing was found');
              resolve([]);
              return;
            }
            const f = imap.fetch(results, { bodies: '' });

            const emails = [];

            f.on('message', (msg, seqno) => {
              if (last === '') {
                const seen = data.some((email) => email.Email === seqno);

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
                      Seen: seen ? 'true' : 'false',
                    };

                    console.log({ email: email.Seen, From: email.From });
                    emails.push(email);
                    const add = await querries.AddInbox(email);
                  });
                });
              }  
                else if (seqno > last) {
                  const seen = data.some((email) => email.Email === seqno);

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
                        Seen: seen ? 'true' : 'false',
                      };

                      console.log({ email: email.Seen, From: email.From });
                      emails.push(email);
                      const add = await querries.AddInbox(email);
                    });
                  });
                
              }else{
                // Aucun e-mail n'est trouvé avec un numéro de séquence supérieur à `last`
                console.log('No emails found with a sequence number greater than `last`');
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
        console.error(err); // ERREUR SI L'UTILISATEUR EST HORS LIGNE
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
//getEmails()

// INBOX 'READ'

async function getSeenEmails() {
  return new Promise((resolve, reject) => {
    try {
      const imap = new Imap(imapConfig);

      imap.once('ready', () => {
        imap.openBox('INBOX', false, () => {
          imap.search(['SEEN'], (err, results) => {
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
              
                msg.on('body', (stream, info) => {
                  simpleParser(stream, (err, parsed) => {
                    if (err) {
                      console.error(err);
                      reject(err);
                      return;
                    }
  
                    const email = {
                      Email: seqno,
                    };
                    
                    console.log({email: email.Email})
                    emails.push(email);
                   // const add = await querries.AddInbox(email);
                  
                  });
                });
              }
              
            );

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
//getSeenEmails(7)
// INBOX 'UNSEEN'

async function getUnseenEmails() {
  return new Promise((resolve, reject) => {
    try {
      const imap = new Imap(imapConfig);

      imap.once('ready', () => {
        imap.openBox('INBOX', false, () => {
          imap.search(['UNSEEN'], (err, results) => {
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
              msg.on('body', (stream, info) => {
                simpleParser(stream, (err, parsed) => {
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
                  
                  console.log({email: email.Cc.text, From:email.From})
                  emails.push(email);
                 // const add = await querries.AddInbox(email);
                
                });
              });
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
      });

      // Gérer l'événement d'erreur de connexion
      imap.once('error', (err) => {
        console.error('Erreur lors de la connexion au serveur IMAP:', err);
      });
    }
  });
}


// Appeler la fonction pour trouver les paramètres IMAP pour votre domaine
//findImapSettings('your-domain.com');


module.exports = {
    getEmails,
    getSeenEmails,
    getUnseenEmails,
    findImapSettings,
    getEmails2
}
// getEmails()
//   .then((emails) => {
//     // Do something with the emails
//     console.log(emails);
//   })
//   .catch((error) => {
//     console.error('An error occurred:', error);
//   });

// Appeler la fonction pour trouver les paramètres IMAP pour votre domaine
//findImapSettings('your-domain.com');


