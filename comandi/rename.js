
const { SlashCommandBuilder } = require('@discordjs/builders');
const { Interaction, Guild } = require('discord.js');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('rinomina')
        .setDescription('Comando Rinomina | Accessibile solo agli staffer')
        .addStringOption(option =>
                option.setName('titolo')
                .setDescription('Nuovo nome:')
                .setRequired(true)),
        
        async execute(interaction, client ) {
        if (interaction.channel.name.includes('ticket'))  { 
            if (interaction.member?.roles.cache.has(client.config.ruoli.staffgen)) {
                interaction.channel.setName(interaction.options.getString('titolo')) 
                const embed = new client.discord.MessageEmbed()
                    .setDescription(` Il nome del canale è stato modificato in **${interaction.options.getString('titolo')}** da **<@${interaction.user.id}>** `)
                    .setColor("GREEN")
                    .setTimestamp()
                interaction.reply({embeds: [embed]});
            } else {
                interaction.reply({content: ":point_up:", ephemeral: true})
            }
        } else {
            interaction.reply({content: ":point_up:", ephemeral: true});
        }
    }
}
