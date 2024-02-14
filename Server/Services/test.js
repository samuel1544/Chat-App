const Imap = require('imap');
const { simpleParser } = require('mailparser');

const imapConfig = {
  user: 'samuel.charlessamuel03@outlook.com',
  password: '1544azebaze',
  host: 'imap.outlook.com',
  port: 993,
  tls: true,
  tlsOptions: { rejectUnauthorized: false },
};

async function getEmails() {
  return new Promise((resolve, reject) => {
    try {
      const imap = new Imap(imapConfig);

      imap.once('ready', () => {
        imap.openBox('INBOX', false, () => {
          imap.search(['SEEN'], (err, results) => {
            if (err) {
              console.error(err);
              reject(err);
            }

            const f = imap.fetch(results, { bodies: '' });

            const emails = [];

            f.on('message', (msg, seqno) => {
              msg.on('body', (stream, info) => {
                simpleParser(stream, (err, parsed) => {
                  if (err) {
                    console.error(err);
                    reject(err);
                  }
                  
                  const email = {
                    Email: seqno,
                    From: parsed.from.text,
                    Subject: parsed.subject,
                    Text: parsed.attachments.map((attachment) => ({
                      Filename: attachment.filename,
                      ContentType: attachment.contentType,
                      Data: attachment.content,
                    })),
                  };
                  //console.log(email)
                  
                  emails.push(email);
                  
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
    findImapSettings
}