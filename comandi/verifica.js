const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageButton, MessageActionRow } = require('discord.js');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('verifica')
        .setDescription('Comando setup Verifica| Accessibile solo agli staffer'),
        
    async execute(interaction, client) {
        if (interaction.member?.roles.cache.has(client.config.ruoli.staffgen)){
            var row = new MessageActionRow().addComponents(
                new MessageButton()
                    .setLabel("Verifica")
                    .setStyle("DANGER")
                    .setCustomId("verifica_click"),
            )

            const embed = new client.discord.MessageEmbed()
                //.setTitle(`${client.config.server.nomeserver} - Verifica`)
                .setTitle("Verifica")
                .setDescription("**Clicca la reazione per verificarti \r Click the button for verify yourself**")
                .setColor("WHITE")
                //.setThumbnail("https://cdn.discordapp.com/attachments/1061791949977296916/1103681838234472458/logus.gif")
                .setImage("https://cdn.discordapp.com/attachments/1059851273400221706/1115608189669482516/eliteserv.png")
                //.setTimestamp()
            interaction.channel.send({embeds: [embed], components: [row]});
            interaction.reply({content: "Setup eseguito correttamente!", ephemeral: true});
     }
        else
            interaction.reply({content: ":point_up:", ephemeral: true});
    }
}