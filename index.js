/*
DEVELOPED BY Attix22
*/
// Discord Js
const { Client, Collection, Intents } = require('discord.js');
global.Discord = require("discord.js");

global.client = new Client({ 
    partials: ["CHANNEL"], 
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_BANS,
        Intents.FLAGS.GUILD_INTEGRATIONS,
        Intents.FLAGS.GUILD_WEBHOOKS,
        Intents.FLAGS.GUILD_INVITES,
        Intents.FLAGS.GUILD_VOICE_STATES,
        Intents.FLAGS.GUILD_PRESENCES,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        Intents.FLAGS.GUILD_MESSAGE_TYPING,
        Intents.FLAGS.DIRECT_MESSAGES,
        Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
        Intents.FLAGS.DIRECT_MESSAGE_TYPING,
    ],
    autoReconnect: true,
    disableEveryone: true,
    fetchAllMembers: true,
});

client.discord = require('discord.js');

// Chalk
client.chalk = require("chalk");

// Fs
client.fs = require("fs");

// Transcript
client.discordTranscripts = require('discord-html-transcripts');

// Config
client.config = require('./config.json');

//ruoliblackilst
const immuneRoles = ['1114475554704470093'];


//ruoliallowlist
const allowedRoles = ['1114475554704470094'];



//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

client.on("error", console.error);
client.on("warn", console.warn);
client.login(client.config.bot.token);

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { read } = require('fs');
const { TIMEOUT, resolveSoa } = require('dns');

client.commands = new Collection();
const commands = [];
const commandFiles = client.fs.readdirSync(`./comandi`).filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
  const command = require(`./comandi/${file}`);
  client.commands.set(command.data.name, command);
  commands.push(command.data.toJSON());
};

const rest = new REST({ version: '9' }).setToken(client.config.bot.token);
(async () => {
	try {
		await rest.put(
			Routes.applicationGuildCommands(client.config.bot.clientid, client.config.server.idguild),
			{ body: commands },
		);
	} catch (error) {
		console.error(error);
	}
})();

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;
  
    const command = client.commands.get(interaction.commandName);
    if (!command) return;
  
    try {
      await command.execute(interaction, client, client.config);
        } catch (error) {
      console.error(error);
      return interaction.reply({
        content: 'C\'è stato un errore nell\'eseguire questo comando!',
        ephemeral: true
      });
    };
  });
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////// Benvenuto

/*const { createCanvas, loadImage, registerFont } = require("canvas");
const { timeStamp } = require('console');
registerFont("./font/roboto.ttf", { family: "roboto" })
registerFont("./font/robotoBold.ttf", { family: "robotoBold" })
registerFont("./font/SpaceMono-Bold.ttf", { family: "SpaceMono-Bold" })
registerFont("./font/SpaceMono-Regular.ttf", { family: "SpaceMono-Regular" })

client.on("guildMemberAdd", async member => {
    //Creare un canvas
    let canvas = await createCanvas(506, 195) //createCanvas(larghezza, altezza)
    let ctx = await canvas.getContext("2d")

    //Caricare un immagine
    let img = await loadImage("./img/background.png")
    ctx.drawImage(img, canvas.height / 2 - img.height / 2, canvas.height / 2 - img.height / 2)  //drawImage(immagine, posizioneX, posizioneY, larghezza, altezza)


    //Caricare un immagine rotonda
    ctx.save()
    ctx.beginPath()
    ctx.arc(103,99, 75, 0, 2 * Math.PI, false) //arc(centroX, centroY, raggio, startAngolo, endAngolo, sensoOrario/Antiorario)
    ctx.clip()
    img = await loadImage(member.displayAvatarURL({ format: "png" }))
    ctx.drawImage(img, 23, 21, 165, 154)
    ctx.restore()

    //Creare le scritte

    ctx.fillStyle = "#fff";
    ctx.textBaseline = "middle";
    
    let maxLength = 20; 
    let text = member.user.username.slice(0, maxLength);
    let textWidth = ctx.measureText(text).width;
    //console.log(textWidth);
    let fontSize = 20; 
    let maxWidth = 100;
    //let canvasWidth = 685;
    
    
    if (text.length < member.user.username.length) {
      text = text.slice(0, -9) + "...";
    }
    
    while (textWidth > maxWidth && fontSize > 20) {
      fontSize--;
      ctx.font = fontSize + "px SpaceMono-Bold";
      textWidth = ctx.measureText(text).width;
    }
   
    let x;
        if (textWidth <= 51) {
          x = 301;
      } else if (textWidth <= 81) {
         x = 293;
      }   else if (textWidth <= 101) {
          x = 284;
      }else if (textWidth <= 121) {
            x = 274;
      }  else if (textWidth <= 141) {
        x = 266;
      } else {
         x = 306;
      }
    let y = 140;
    
    
    ctx.font = fontSize + "px SpaceMono-Bold";
    ctx.fillText(text, x, y);
    
    

    //Mandare un canvas
    let channel = client.channels.cache.get("1049404962993610793")

    let attachment = new Discord.MessageAttachment(canvas.toBuffer(), "KALIRP.png");

    channel.send( { files: [attachment] });

    setTimeout(() => {
      channel.send(`**Benvenuto <@${member.user.id}> su KaliRP!**`)
  }, 500);
  });*/


  
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  client.on('message', message => {
    if (message.content.startsWith('/say')) {
      if (!allowedRoles.some(role => message.member.roles.cache.has(role))) {
        message.delete();
        return message.reply("Spiacente, non puoi eseguire questo comando!").then(msg => {
          setTimeout(() => {
            msg.delete();
          }, 5000); 
        });
      }
      message.delete();
        if (message.author.bot) return;
        const SayMessage = message.content.slice(4).trim();
       
        message.channel.send("**" + SayMessage + "**")
    
}});




//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//**\r Messagio blacklistato** = ||**${testo}**||
client.on("messageCreate", (message) => {
  if (!message.member) return;

  let hasImmuneRole = false;
  immuneRoles.forEach(roleId => {
    const role = message.guild.roles.cache.get(roleId);
    if (role && message.member.roles.cache.has(role.id)) {
      hasImmuneRole = true;
    }
  });

  const allowedChannels = ["1106896929004204063"];
  const isAllowedChannel = allowedChannels.includes(message.channel.id);

  var blacklist = ["serverdimerda", "server di merda", "fallito", "Ammazzati", "Artemis", "artemis", "Vanquest", "vanquest", "Grau", "grau", "bestie di fivem", "Bestie di fivem", "Bestiedifivem", "bestidifivem"];
  var trovata = false;
  var logparola = message.content;
  var testo = logparola;
  var testocompleto = message.content;
  
  if (!hasImmuneRole && !isAllowedChannel) {
    blacklist.forEach(parola => {
      if (!message.member.user.bot) {
        if (message.content.includes(parola)) {
          trovata = true;
          testo = parola; // aggiorna "testo" con la parola blacklistata
        }
      }
    });
  }
  

  if (trovata) {
    message.delete();

    if (logparola) {
      const channel = message.guild.channels.cache.get("1106896958410461194");
      var embed = new Discord.MessageEmbed()
      .setTitle("Olimpo RP - Bot")
      .setDescription(`${message.author} **ha scritto una parola blacklistata**\r **Messagio blacklistato** = ||**${testo}**||\r **Messagio completo** = ||**${testocompleto}**||`)
      .setColor("#0099ff");

      channel.send({ embeds: [embed] });
    }
  }
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
client.on("messageCreate", (message) => {
  if (!message.member) return;

  let hasImmuneRole = false;
  immuneRoles.forEach(roleId => {
    const role = message.guild.roles.cache.get(roleId);
    if (role && message.member.roles.cache.has(role.id)) {
      hasImmuneRole = true;
    }
  });

  var blacklist = ["negro","n3gr0", "ricchione","n34r0", "r1cch10n3", "41cch10n3", "R1CCH10N3", "Frocio", "frocio", "Fr0c10", "fr0c10", "froc1o", "NEGRO", "N3GR0", "N3G40", "Negro" ];
  var trovata = false;
  var testo = logparola;
  var logparola = message.content;
  var testocompleto = message.content;

  if (!hasImmuneRole) {
    blacklist.forEach(parola => {
      if (!message.member.user.bot) {
        if (message.content.includes(parola)) {
          trovata = true;
          testo = parola; // aggiorna "testo" con la parola blacklistata
        }
      }
    });
  }
  

  if (trovata) {
    message.delete();
    //var embed = new Discord.MessageEmbed()
     // .setTitle("Kali RP - Bot")
      //.setDescription(`${message.author}** ha scritto una parola blacklistata ed è stato bannato**`)
     // .setColor("#0099ff");

   // message.channel.send({ embeds: [embed] });

    if (logparola) {
      const channel = message.guild.channels.cache.get("1106896958410461194");
      //channel.send(`${message.author} **ha scritto una parola blacklistata ed è stato bannato**\r **Messagio blacklistato** = ||**${testo}**||`);
      var embed = new Discord.MessageEmbed()
      .setTitle("Olimpo RP - Bot")
      .setDescription(`${message.author}** ha scritto una parola blacklistata ed è stato bannato**\r **Messagio blacklistato** = ||**${testo}**||\r **Messagio completo** = ||**${testocompleto}**||`)
      .setColor("#0099ff");

    channel.send({ embeds: [embed] });
    }

    message.guild.members.ban(message.author, {
      reason: "Parola non consona",
    });
  }
});


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

client.on("messageCreate", (message) => {
  if (message.content.startsWith('!help')) {
    message.delete();

    var embed = new Discord.MessageEmbed()
        .setTitle("Olimpo RP - Bot")
        .setDescription(`**/aggiungi: Aggiungere persone ad un ticket\n /rimuovi: Rimuovere persone da un ticket\n /rinomina: Cambia il titolo del ticket** `)

    message.channel.send({ embeds: [embed] })
}
})

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
client.on("messageCreate", message => {
  
  if (message.content.startsWith("!!clear")) {
      if (!message.member.permissions.has("MANAGE_MESSAGES")) {
        message.delete();
        return message.channel.send("Spiacente, non puoi eseguire questo comando!").then(msg => {
          setTimeout(() => {
            msg.delete();
          }, 5000); 
        });
      }
      if (!message.guild.me.permissions.has("MANAGE_MESSAGES")) {
        message.delete();
        return message.channel.send("Spiacente, non posso eseguire questo comando!").then(msg => {
          setTimeout(() => {
            msg.delete();
          }, 5000); 
        });
      }
      var count = parseInt(message.content.split(/\s+/)[1]);
      if (!count) {
        message.delete();
        return message.channel.send("Inserisci un numero valido!").then(msg => {
          setTimeout(() => {
            msg.delete();
          }, 5000); 
        });
      }
      if (count > 100) {
        message.delete();
        return message.channel.send("Spiacente, non puoi cancellare più di 100 messaggi!").then(msg => {
          setTimeout(() => {
            msg.delete();
          }, 5000); 
        });
      }
      message.channel.bulkDelete(count + 1, true)
      message.channel.send(count + " messaggi eliminati").then(msg => {
          setTimeout(() => msg.delete(), 5000);
      })
  }
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const eventFiles = client.fs.readdirSync(`./events`).filter(file => file.endsWith('.js'));
for (const file of eventFiles) {
    const event = require(`./events/${file}`);
    client.on(event.name, (...args) => event.execute(...args, client));
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

client.on('ready', async () => {
  console.log(client.chalk.green("Log: ") + `Bot startato corretamente`)
  console.log(client.chalk.green("Log: ") + "BOT Connesso "+ client.chalk.blueBright("["+ client.user.tag + "]"));
  client.user.setActivity(`${client.config.bot.nomebot}`, { type: 'WATCHING' })
  console.log("Developed by: "+client.chalk.blue("Attix22#5037"))
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////