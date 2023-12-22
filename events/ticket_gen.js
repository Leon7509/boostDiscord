const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');


const openTickets = {};

module.exports = {
    name: 'interactionCreate',
    async execute(interaction, client) {
        if (interaction.isButton()) {
            if (interaction.customId == "ticket_acquisti") {
                const userId = interaction.user.id;
                if (openTickets[userId] >= 1) {
                    interaction.reply({content: "Hai già raggiunto il limite di ticket aperti!", ephemeral: true});
                    return;
                }

               else {
                    interaction.guild.channels.create(`${interaction.user.username}-ticket`, {
                        type: "text",
                        parent: client.config.stanze.ticket.acquisti,
                        topic: userId,
                        permissionOverwrites: [
                            { id: userId, allow: ['VIEW_CHANNEL', 'SEND_MESSAGES'] },
                            { id: client.config.ruoli.staffgen, allow: ['VIEW_CHANNEL', 'SEND_MESSAGES'] },
                            { id: interaction.guild.id, deny: ['VIEW_CHANNEL', 'SEND_MESSAGES'] }
                        ]
                    }).then(channel => {
                        channel.send(`<@&1114475554704470093>`)
                        var embed = new Discord.MessageEmbed()
                            .setTitle("Ticket Generale")
                            .setDescription(`Ciao <@${userId}>, chiedi pure.\n Hello <@${userId}>, please ask`)
                            .setColor('GREEN')

                        var row = new MessageActionRow().addComponents(
                            new MessageButton()
                                .setLabel("🔒 Close")
                                .setStyle("DANGER")
                                .setCustomId("chiudi_ticket"),
                        )
                        
                        channel.send({embeds: [embed], components: [row]});
                        openTickets[userId] = openTickets[userId] ? openTickets[userId] + 1 : 1;

                        interaction.reply({content: `<@${userId}>\nGrazie per aver aperto un ticket!\nThanks for open a ticket!\n<#${channel.id}>`, ephemeral: true});
                    })
                }
            }
        }
    }
}

client.on('channelDelete', channel => {
    if (channel.parent && channel.parent.id === client.config.stanze.ticket.generale && channel.topic) {
      const userId = channel.topic;
      if (openTickets[userId] && openTickets[userId] > 0) {
        openTickets[userId]--;
      }
    }
  });
  