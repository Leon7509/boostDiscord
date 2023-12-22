const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('clear')
    .setDescription('Comando Clear | Accessibile solo agli staffer')
    .addIntegerOption(option =>
      option.setName('quantità')
        .setDescription('Quantità di messaggi da eliminare')
        .setRequired(true)),

  async execute(interaction, client) {
    if (!interaction.member.permissions.has('MANAGE_MESSAGES')) {
      return interaction.reply({
        content: 'Spiacente, non hai il permesso per eseguire questo comando!',
        ephemeral: true
      });
    }

    if (!interaction.guild.me.permissions.has('MANAGE_MESSAGES')) {
      return interaction.reply({
        content: 'Spiacente, non ho il permesso per eseguire questo comando!',
        ephemeral: true
      });
    }

    const count = interaction.options.getInteger('quantità');
    if (!count || count <= 0 || count > 100) {
      return interaction.reply({
        content: 'Inserisci un numero valido compreso tra 1 e 100!',
        ephemeral: true
      });
    }

    await interaction.channel.bulkDelete(count + 1, true);

    if (count <= 1) {
    return interaction.reply({
        content: `${count} messaggio eliminato.`,
        ephemeral: true
      }
      )
    }

      else{
        return interaction.reply({
            content: `${count} messaggi eliminat1.`,
            ephemeral: true
          })}
      }
  }
