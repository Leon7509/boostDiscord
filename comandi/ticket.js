
const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageButton, MessageActionRow } = require('discord.js');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('ticket')
        .setDescription('Comando setup ticket| Accessibile solo agli staffer'),
        
    async execute(interaction, client) {
        if (interaction.member?.roles.cache.has(client.config.ruoli.staffgen)){
            var row = new MessageActionRow().addComponents(
                new MessageButton()
                    .setLabel("📩 | Ticket")
                    .setStyle("SUCCESS")
                    .setCustomId("ticket_click"),
            )

            const embed = new client.discord.MessageEmbed()
                .setTitle(`${client.config.server.nomeserver} - Ticket`)
                .setDescription("Clicca il bottone [Ticket] Per aprire un ticket!")
                .addField("📩 | Ticket", "Qualsiasi tipo di supporto")
                .setColor("BLUE")
                .setTimestamp()
                
            interaction.channel.send({embeds: [embed], components: [row]});
            interaction.reply({content: "Setup eseguito correttamente!", ephemeral: true});
            
        }else
            interaction.reply({content: ":point_up:", ephemeral: true});
    }
}