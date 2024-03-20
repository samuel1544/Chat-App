async function ConvertFile(){
    // Enregistrement des pièces jointes sur le disque
                  parsed.attachments.forEach((attachment) => {
                    const blobBuffer = Buffer.from(attachment.content);
                    console.log(blobBuffer)

                    // Remplacez 'C:\\path\\to\\directory' par le chemin d'accès au répertoire souhaité
                    const filePath = `C:\\Users\\PC\\Documents\\Projet\\Chat-App\\${attachment.filename}`;

                    fs.writeFile(filePath, blobBuffer, (err) => {
                      if (err) {
                        console.error('Erreur lors de l\'enregistrement du fichier :', err);
                        return;
                      }

                      console.log(`Le fichier ${attachment.filename} a été enregistré.`);
                    });
                  }); 
}

module.exports = {
    ConvertFile
}