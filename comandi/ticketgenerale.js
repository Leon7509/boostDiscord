
const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageButton, MessageActionRow } = require('discord.js');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('ticketacquisti')
        .setDescription('Esegui il comando per i ticket | non usare altreimenti ban'),
        
    async execute(interaction, client) {
        if (interaction.member?.roles.cache.has(client.config.ruoli.staffgen)){
            var row = new MessageActionRow().addComponents(
                new MessageButton()
                    .setLabel("💸| Acquisti")
                    .setStyle("PRIMARY")
                    .setCustomId("ticket_acquisti"),
            )

            const embed = new client.discord.MessageEmbed()
                //.setTitle(`${client.config.server.nomeserver} - Ticket`)
                .setTitle("Acquisto")
                .setDescription("Apri questo ticket se vuoi acquistare o chiedere informazioni!")
                .setColor("GREEN")
               // .setTimestamp()
                
            interaction.channel.send({embeds: [embed], components: [row]});
            interaction.reply({content: "Setup eseguito correttamente!", ephemeral: true});
            
        }else
            interaction.reply({content: ":point_up:", ephemeral: true});
    }
}