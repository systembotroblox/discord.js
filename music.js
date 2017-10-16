const Discord = require("discord.js");
const bot = new Discord.Client();
const YTDL = require('ytdl-core')
var prefix = "!"


function play(connection, message) {
    var server = servers[message.guild.id];
    server.dispatcher = connection.playStream(YTDL(server.queue[0], {filter: 'audioonly'}));
    server.queue.shift();
    server.dispatcher.on('end', function() {
        if(server.queue[0]) play(connection, message);
        else connection.disconnect();
    });
}

var servers = {};

bot.on('ready', () => {
    console.log("Jt'aikassé ready");
});

/* MUSIC BOT */

bot.on('message', function(message) {
    if(message.author.equals(bot.user)) return;
    if(!message.content.startsWith(prefix)) return;

    var args = message.content.substring(prefix.length).split(' ');

    switch(args[0].toLowerCase()) {
            case 'help':

            break;

          
            case 'play':
                if(!args[1]) {
                    message.channel.sendMessage("Mauvaise syntaxe ! Vous n'avez pas bien utiliser la commande ou vous n'êtes pas dans un channel vocal");
                return;
                }
                if(!message.member.voiceChannel) {
                    message.channel.sendMessage('Vous devez être dans un channel vocal !');
                return;
                }
                if(!servers[message.guild.id]) servers[message.guild.id] = {
                    queue: []
                };
                var server = servers[message.guild.id];
                server.queue.push(args[1]);
                if(!message.guild.voiceConnection) message.member.voiceChannel.join().then(function(connection) {

                    play(connection, message);
                });
                break;

                case 'skip':
                    var server = servers[message.guild.id];
                    if(server.dispatcher) server.dispatcher.end();
                break;

                case 'stop':
                    var server = servers[message.guild.id];
                    if(message.guild.voiceConnection) message.guild.voiceConnection.disconnect();
                break;


    }
});



bot.on('message', function(message) {
    if(message.content === '!modhelp') {
        message.channel.send('**@Moderateur** | Un moderateur SVP!');
    }

})
    
  

  bot.on('message', function(message) {
      if (message.content === '!embedhelp') {
          var embed = new Discord.RichEmbed()
          .setDescription("@Moderateur")
          message.channel.send(embed);
      }
  })

  bot.on('message', function(message) {
    if (message.content === "!myavatar") {
        message.reply(message.author.avatarURL);
    }

    if (message.content === '!defaultavatar') {
        message.reply(message.author.defaultAvatarURL)
    }

    if (message.content === '!myavatarid') {
        message.reply(message.author.avatar)
    }

    if (message.content === '!myid') {
        message.reply(message.author.discriminator)
    }

    if (message.content === '!myusername') {
        message.reply(message.author.username)
    }

    if (message.content === '!mytag') {
        message.reply(message.author.tag)
    }

    if (message.content === "!thisidmessage") {
        message.reply(" L'id de ce message est : " + "**" + message.id + "**")
    }

    if (message.content === '!test') {
        message.reply(message.embeds)
    }
  })

  bot.on('message', function (message) {
      if (message.content === '!help') {
          message.reply("``!help: All commands\n!mytag : Votre id (#)\n!thisidmessage: l'id de ce message`\n!myusername: Votre pseudo\n!myavatar: Votre avatar\n!defaultavatar: Avatar par défaut\n!myavatarid: Id de votre avatar ``")
      }
  })


  bot.on('guildMemberAdd', function(member) {
    var arrivant = member.guild.channels.find('name', 'general');
    if (!channel) return; {
        message.channel.send('Bienvenue sur le serveur, ${member}');
    }
  })



  bot.on('ready', function (ready) {
      bot.user.setGame('Programmation').catch(console.error)
      bot.user.setAvatar('./img/BotAvatar.jpg').catch(console.error)
  })

bot.on('message', function (message) {
    if (message.content === 'I am the best !')
    message.react("\:sunglasses:")
})

bot.login('token');
