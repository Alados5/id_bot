const Discord = require('discord.js');
const bot = new Discord.Client();
const cfg = require('./config.json');
var fs = require("fs");

var path = './IDSave.txt';
var id_list = {};

fs.readFile(path, "utf8", function(error, data) {
  if(error) {
    console.error("Read error: " + error.message);
  }
  else {
    var userlist = data.split('\n');
    userlist = userlist.slice(0,-1);
    for (i=0; i < userlist.length; i++) {
      var line = userlist[i].split(';;');
      console.log(line);
      var content = {};
      content.id = line[1];
      content.server = line[2];
      content.info = line[3];
      content.link = line[4];
      id_list[line[0]] = content
    }
    console.log(id_list);
  }
});

bot.on('ready', () => {
  console.log('Ready');
  bot.user.setActivity(`${cfg.prefix}help | ${bot.guilds.size} servers`)
});

bot.on('message', msg => {
  //Checks if author is a bot or message doesn't start with prefix
  if(msg.author.bot || !msg.content.startsWith(cfg.prefix)) return;

  //Checks if the author is me
  if(msg.author.id == cfg.ownerID && msg.content == '!MyBot') {
    msg.reply('What is thy bidding, my Master?')
  }

  //Handles arguments to just take the first word
  const args = msg.content.slice(cfg.prefix.length).split(/ +/);
  const command = args.shift().toLowerCase();

  if(command == 'help') {
    //message.reply('text');
    msg.channel.send('Commands: !save, !show');
    msg.channel.send({embed: {
      color: 16757760,
      author: {
        name: bot.user.username,
        icon_url: bot.user.avatarURL
      },
      title: "Bot HELP Service",
      description: "I'm only online when Alados5 boots me. "+
      "Maybe I'll be able to run 24/7 one day! \n You can call me with these commands:",
      footer: {
        text: "I'm a bot created by Alados5",
        icon_url: bot.user.avatarURL
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

    var writethis = msg.author.username + ';;' + args[0] + ';;' + args[1] + ';;' + addinfo + ';;' + addlink +'\n'
    fs.appendFile(path, writethis, function(error) {
      if(error) {
        console.error("Write error: "+error.message);
      }
    });

    msg.channel.send(
      msg.author.username+" has saved his "+args[1]+" ID: "+args[0]
    )
  }


  if(command == 'show') {
    const wanteduser = msg.mentions.members.first().user.username;
    if (!wanteduser) return msg.reply('Mention a user')
    const allinfo = id_list[wanteduser];
    if (allinfo == undefined) return msg.reply('This user is not registered')

    msg.channel.send({embed: {
      color: 16757760,
      author: {
        name: bot.user.username,
        icon_url: bot.user.avatarURL
      },
      title: "ID Database Bot",
      description: "I'm only online when Alados5 boots me. "+
      "Maybe I'll be able to run 24/7 one day! \n The info you requested:",
      footer: {
        text: "I'm a bot created by Alados5",
        icon_url: bot.user.avatarURL
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

//bot.login(cfg.token);
bot.login(process.env.BOT_TOKEN);