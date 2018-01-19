const Discord = require('discord.js');
const client = new Discord.Client();

var id_list = {};
const prefix = '!';
const ownerID = "284104569586450434";
const charlieID = "389070076235481090";
const fappingtonID = "391601707022549007";
const joseluID = "210835574641262602";

client.on('ready', () => {
  //client.user.setActivity(`${cfg.prefix}help | ${bot.guilds.size} servers`)
  client.user.setGame("!help, !ayuda");
});

client.on('message', msg => {
  //Checks if author is a bot or message doesn't start with prefix
  if(msg.author.bot || !msg.content.startsWith(prefix)) return;
  
  //Checks if the author is me
  if(msg.author.id == ownerID && msg.content == '!MyBot') {
    msg.reply('What is thy bidding, my Master?')
  }
  
  if(msg.author.id == charlieID) {
    if (msg.content == '!QuienSoy') {
      msg.reply("un grande, el que ha soportado mil menciones por minuto para que esto funcione, mil gracias! :D")
    }
    if (msg.content == '!Hey') {
      msg.reply('¡Hey Charlie! ¿Quieres comprobar si aún tengo tu ID? ¡Gracias por todo!')
    }
  }
  
  if(msg.author.id == fappingtonID) {
    if (msg.content == '!QuienSoy') {
      msg.reply('un grande, el que ha ido probando el bot a cada hora para probar que se guardara. Gracias!')
    }
  }
                                              
  if(msg.author.id == joseluID) {
    if (msg.content == '!QuienSoy') {
      msg.reply('el mejor youtuber de OPTC en español. Y un puto whale rager ;)')
    }
    if (msg.content == '!Hey') {
      msg.reply('Hey! Tienes a Lucy... Y A CROCO. No necesitas saber más')
    }
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
      description: "I'm only online when Alados5 wants. "+
      "Now I'm trying to run 24/7! \n If you see me offline, ask why! \n You can call me with these commands:",
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

  if(command == 'save') {
    if(isNaN(args[0]) == true) return msg.reply('Enter your ID number after !save')
    else if(args[0].length !== 9) return msg.reply('Your ID must have 9 digits')
    if(args[1] !== "Japan" && args[1] !== "Global") return msg.reply('Specify Japan or Global after your ID')

    var data = args.slice(2).toString();
    data = data.replace(/,/g, " ");
    data = data.replace(/  /g, ", ");
    var datalist = data.split("http");
    
    if(datalist.length == 1) {
      var addinfo = datalist[0];
      var addlink = ''
    }
    else {
      var addinfo = datalist[0];
      var addlink = 'http'+datalist[1];
    }

    if(addinfo == '') addinfo = 'N/A'
    
    var content = {};
    content.id = args[0];
    content.server = args[1];
    content.info = addinfo;
    content.link = addlink;
    id_list[msg.author.username] = content
    
    msg.channel.send(msg.author.username+" has saved his "+args[1]+" ID: "+args[0])
    //msg.channel.send("It works for now")
  }
  
  if(command == 'show') {
    if (msg.mentions.members.first() == undefined) return msg.reply('Mention a user')
    const wanteduser = msg.mentions.members.first().user.username;
    if (!wanteduser) return msg.reply('Mention a user')
    const allinfo = id_list[wanteduser];
    if (allinfo == undefined) return msg.reply('This user is not registered')

    msg.channel.send({embed: {
      color: 16757760,
      title: "ID Database Bot",
      description: "The info you requested: \n -",   
      footer: {
        text: "I'm a bot created by Alados5 | I should be online 24/7",
        icon_url: client.user.avatarURL
      },
      image: {
        url: allinfo.link
      },
      fields: [
        {
          name: "User Name (in Discord)",
          value: wanteduser
        },
        {
          name: "Server",
          value: allinfo.server
        },
        {
          name: "ID",
          value: allinfo.id
        },
        {
          name: "Additional Info",
          value: allinfo.info
        }
      ]
    }})

  }
  
});





// THIS  MUST  BE  THIS  WAY
client.login(process.env.BOT_TOKEN);
