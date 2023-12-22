module.exports = {
    name: 'interactionCreate',
    async execute(interaction) {
      if (interaction.isButton()) {
        if (interaction.customId === "verifica_click") {
          const member = interaction.member;
          //const attesaWLRole = client.config.ruoli.attesaWL;
          //const whitelist = client.config.ruoli.cittadino;
          const user = client.config.ruoli.user;
  
          if (member.roles.cache.has(user)) {
            interaction.reply({ content: "Sei già verificato \n You are already verified", ephemeral: true }).catch(console.error);
          } else {
            member.roles.add(user);
            interaction.reply({ content: "Ti sei verificato \n You verified yourself", ephemeral: true }).catch(console.error);
          }
        }
      }
    }
  };
  
  