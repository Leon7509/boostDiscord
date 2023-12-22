module.exports = {
  name: 'interactionCreate',
  async execute(interaction, client) {
    if (interaction.isButton() && interaction.customId == 'chiudi_ticket') {
      interaction.message.components[0].components.forEach(button => {
        if (button.customId === 'chiudi_ticket') {
          button.setDisabled(true);
        }
      });
      await interaction.update({ components: [interaction.message.components[0]] });
      interaction.channel.send({ content: "Il ticket verrà eliminato in 5 secondi!"});
      if (
        interaction.member?.roles.cache.has(client.config.ruoli.staffgen) ||
        interaction.member?.roles.cache.has(client.config.ruoli.cittadinodielgis)
      ) {
        // crea il file di transcript con DiscordTranscripts
        const attachment = await client.discordTranscripts.createTranscript(interaction.channel);

        // inizializza Firebase Admin SDK con le credenziali dell'account di servizio
        const admin = require('firebase-admin');
        // inizializza Firebase Admin SDK solo se l'applicazione non è già stata inizializzata
        if (!admin.apps.length) {
          const serviceAccount = require('C:/Users/Attilio/Desktop/FiveM/Bot discord/EliteService/transcript.json');
          admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
            storageBucket: 'eliteservice-8aa31.appspot.com'
          });
        }

        // ottieni il riferimento all'istanza di storage di Firebase
        const storage = admin.storage().bucket();

        // definisci il nome del file e il path locale del file di transcript
        const randomNumber = Math.floor(Math.random() * 100000);
        const fileName = `transcript_${interaction.channel.name}_${Date.now()}_${randomNumber}.html`;

        async function uploadFileToFirebase(fileName, attachment) {
          // crea un riferimento al file nel bucket di storage di Firebase
          const file = storage.file(fileName);

          // carica il file nel bucket di storage di Firebase
          await file.save(attachment.attachment);

          // ottieni il link al file appena caricato
          const [url] = await file.getSignedUrl({
            action: 'read',
            expires: '03-09-2024' // scadenza del link
          });

          return url;
        }

        const url = await uploadFileToFirebase(fileName, attachment);

        // crea l'embed da inviare nel canale di log
        const category = interaction.guild.channels.cache.get(interaction.channel.parentId);
        const embed = new client.discord.MessageEmbed()
          .setTitle('**__Transcript__**')
          .setColor('BLUE')
          .addFields(
            { name: `Aperto da:`, value: `<@${interaction.channel.topic}>`, inline: true },
            { name: `Ticket Name:`, value: `${interaction.channel.name}`, inline: true },
            { name: `Chiuso da:`, value: `<@${interaction.user.id}>`, inline: true },
            { name: `Tipo di Ticket:`, value: `${category.name}`, inline: true },
            { name: `Link al transcript:`, value: `[Transcript](${url})`, inline: false }
          );

        // invia l'embed e il link nel canale di log
        interaction.guild.channels.cache
          .get(client.config.stanze.log.transcript)
          .send({ embeds: [embed] /*, files: [attachment]*/ })
              .catch(console.error);
  
            // elimina il canale di ticket
            
            setTimeout(() => {
              interaction.channel.delete();
            }, 5000);
          } 
        }
      }
    };