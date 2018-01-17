const Discord = require('discord.js');
const client = new Discord.Client();

var id_list = {};
const prefix = '!';
const ownerID = "284104569586450434";

client.on('ready', () => {
  console.log('Ready');
  //client.user.setActivity(`${cfg.prefix}help | ${bot.guilds.size} servers`)
});

client.on('message', msg => {
  //Checks if author is a bot or message doesn't start with prefix
  if(msg.author.bot || !msg.content.startsWith(prefix)) return;
  
  //Checks if the author is me
  if(msg.author.id == ownerID && msg.content == '!MyBot') {
    msg.reply('What is thy bidding, my Master?')
  }
  
  //Handles arguments to just take the first word
  const args = msg.content.slice('!'.length).split(/ +/);
  const command = args.shift().toLowerCase();  
  
  if(command == 'help') {
    //message.reply('text');
    msg.channel.send('Commands: !save, !show');
    msg.channel.send({embed: {
      color: 16757760,
      author: {
        name: client.user.username,
        icon_url: client.user.avatarURL
      },
      title: "Bot HELP Service",
      description: "I'm only online when Alados5 boots me. "+
      "Maybe I'll be able to run 24/7 one day! \n You can call me with these commands:",
      footer: {
        text: "I'm a bot created by Alados5",
        icon_url: client.user.avatarURL
      },
      fields: [
        {
          name: "!save",
          value: "Save an ID with some description. "+
          "Call it with: ```\n !save [ID] [Server] [Info] [Link] \n``` "+
          "ID must be a 9 digit number and Server must be 'Global' or 'Japan'."+
          "\n Separate everything with simple spaces."+
          "\n \n OPTIONAL: Add any info you want after that, and/or a link to a picture of your box."+
          "\n **IMPORTANT!** All links must begin with 'http'!!. \n \n Example: "+
          "\n *!save 123456789 Japan Lucy, Neko https://imgur.com/r/OnePieceTC/t3cRD* \n \n -"
        },
        {
          name: "!show",
          value: "Show the ID of a user in the chat if he/she has saved it. "+
          "Call it with: ```\n !show @USER \n``` "+
          "You have to tag someone (it can be yourself!)."+
          "\n If the user has registered any info, it will appear."
        }
      ]
    }})
  }

  
  
});





// THIS  MUST  BE  THIS  WAY
client.login(process.env.BOT_TOKEN);
