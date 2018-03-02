const Discord = require('discord.js');
const client = new Discord.Client();

var id_list = {};
var lf_list = {};
var rem = 0;
const prefix = '!';

const ownerID = "284104569586450434";
const charlieID = "389070076235481090";
const fappingtonID = "391601707022549007";
const joseluID = "210835574641262602";
const botID = "402991299776741397";

const JPdic = ['japan', 'japon', 'japón', 'jp', 'japonesa', 'japo', 'jap', 'jpn'];
const GLdic = ['global', 'gb', 'gbl', 'glb', 'globest'];

//client.on('ready', () => {
  //client.user.setActivity(`${prefix}help`)
  //client.user.setGame("Online")
//});

var dpj = require("./captains.json");

function findnum(name, dic) {
  for (var num in dic) {
    if (dic.hasOwnProperty(num)) {
      var aliases = dic[num];
      for (var alias=0; alias<aliases.length; alias++) {
        if (aliases[alias] == name) {
          return num
        }
      }
    }
  }
  return '-1'
}  

client.on('message', msg => {
  //Checks if author is a bot or message doesn't start with prefix
  if((msg.author.bot && msg.author.id != botID) || !msg.content.startsWith(prefix)) return;


//------------------------------------------------------------------------- START ADMIN COMMANDS  

  //Handles arguments to just take the first word
  const args = msg.content.slice('!'.length).split(/ +/);
  const command = args.shift().toLowerCase(); 
  
  
  //Checks if the author is me
  if(msg.author.id == ownerID) {
    if(msg.content == '!MyBot') {
      msg.reply('What is thy bidding, my Master?')
    }
    
//------------------------------------------------------------------------- START ALLDATA    
    if(msg.content == '!AllDataID') {
      var database = '';
      var limitmsg = 0;
      for (var key in id_list) {
        if (id_list.hasOwnProperty(key)) {
          database += key + ' ; ';
          database += id_list[key]['id'] + ' ; ';
          database += id_list[key]['server'] + ' ; ';
          database += id_list[key]['info'] + ' ; ';
          database += id_list[key]['link'] + ';; \n';
          limitmsg += 1;
          if(limitmsg >= 10) {
            msg.channel.send(database)
            database = '';
            limitmsg = 0;
          }
        }
      }
      msg.channel.send(database)
    }
    
    if(msg.content == '!AllDataPJ') {
      var database = '';
      var limitmsg = 0;
      for (var key in lf_list) {
        if (lf_list.hasOwnProperty(key)) {
          database += key + ' ; ';
          database += lf_list[key] + ';; \n';
          limitmsg += 1;
          if(limitmsg >= 10) {
            msg.channel.send(database)
            database = '';
            limitmsg = 0;
          }
        }
      }
      msg.channel.send(database)
    }
    
//------------------------------------------------------------------------- END ALLDATA    
    
//------------------------------------------------------------------------- START PRELOAD  
    
    if (command == 'preloadid') {
      msg.reply("Preloading ID data");  
      
      var bulkdata = msg.content.slice(11);
      var lines = bulkdata.split(';;');
      
      for(j=0; j<lines.length; j++) {
        var parts = lines[j].split(' ; ');
            
        var useri = parts[0];
        useri = useri.replace('\n', '');
        if (useri.slice(0,1) == ' ') {
          useri = useri.slice(1);
        }    
            
        id_list[useri] = {'id':parts[1], 'server':parts[2], 'info':parts[3], 'link':parts[4]};
      }       
      msg.channel.send("Update complete!");      
    }
 
    if (command == 'preloadpj') {
      msg.reply("Preloading PJ data");  
      
      var bulkdata = msg.content.slice(11);
      var lines = bulkdata.split(';;');
      
      for(j=0; j<lines.length; j++) {
        var parts = lines[j].split(' ; ');
            
        var useri = parts[0];
        useri = useri.replace('\n', '');
        if (useri.slice(0,1) == ' ') {
          useri = useri.slice(1);
        }
        
        var charstoadd = parts[1].split(',');
        var listtoadd = [];
        for(k=0; k<charstoadd.length; k++) {
          listtoadd.push(charstoadd[k]);
        }
            
        lf_list[useri] = listtoadd;

      }       
      msg.channel.send("Update complete!");      
    }
    
//------------------------------------------------------------------------- END PRELOAD  
    
//------------------------------------------------------------------------- START DELETEUSER    

    if(command == 'deleteuser') {    
      var deluser = msg.content.slice(12);
      if (deluser == '') return msg.reply("Specify a user")
      
      delete id_list[deluser];
      delete lf_list[deluser];

      msg.channel.send('Deleted all info of '+ deluser)

    }
    
//------------------------------------------------------------------------- END DELETEUSER  
    
  }

//------------------------------------------------------------------------- END ADMIN COMMANDS
    
//------------------------------------------------------------------------- START SPAM    

  if(msg.author.id == botID || msg.author.id == ownerID) {
    if(command == 'spam') {    
      var action = msg.content.slice(6);
      if (action == '') return msg.reply("Action Required")
      else if (action == '1') {
        msg.reply('You activated the Bot Sleep Prevention Procedure')
        var myInterval = setInterval (function () {
          var now = new Date();
          var hora = now.getHours();
          hora += 1;
          if (hora == 24) hora = 0;
          if (hora<10) hora = '0' + hora;
          var mins = now.getMinutes();
          if (mins<10) mins = '0' + mins;
          var tnow = hora + ':' + mins; 
          msg.channel.send("! - " + tnow + " - Remembering Data...")
        }, 60000); //every 1 minute (1*60*1000)
      }
      else if (action == '0') {
        msg.reply('You deactivated the Bot Sleep Prevention Procedure (or not)')
        clearInterval(myInterval);
      }
      else {
        msg.reply('Action Invalid')
      }
    }
  }
    
//------------------------------------------------------------------------- END SPAM
  
//------------------------------------------------------------------------- START BOT (SELF) COMMANDS  

  if(msg.author.id == botID) {
    rem += 1;
    if (rem >= 2) {
      msg.channel.send("!spam X")
      rem = 0;
    }
  }
  
//------------------------------------------------------------------------- END BOT (SELF) COMMANDS 
  
//------------------------------------------------------------------------- START USER COMMANDS  
  
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
    if (msg.content == '!Hey') {
      msg.reply('¡Hey Fappington! ¿Me has probado en los últimos 60 minutos? ¿He dejado de funcionar? ¡Gracias por ayudar!')
    }
  }
                                              
  if(msg.author.id == joseluID) {
    if (msg.content == '!QuienSoy') {
      msg.reply('el mejor youtuber de OPTC en español. Y un puto whale rager ;)')
    }
    if (msg.content == '!Hey') {
      msg.reply('¡Muy buenas, JoseLu! ¿Qué tal andamos? Tienes a Lucy... Y A CROCO. No necesitas saber más')
    }
  }
    
  
//------------------------------------------------------------------------- END USER COMMANDS  
  
//------------------------------------------------------------------------- START HELP
  
  if(command == 'help') {
    //message.reply('text');
    msg.channel.send('Commands (EN): !save, !show, !ihave, !lookingfor');
    msg.channel.send({embed: {
      color: 16757760,
      author: {
        name: client.user.username,
        icon_url: client.user.avatarURL
      },
      title: "Bot HELP Service",
      description: "I'm a bot that registers and shows OPTC IDs. \n"+
      "I should run 24/7 and have an updated register! \n"+
      "If you see me offline, ask why! \n \n You can call me with these commands:",
      footer: {
        text: "I'm a bot created by Alados5",
        icon_url: client.user.avatarURL
      },
      fields: [
        {
          name: "!save",
          value: "Save an ID with some description. "+
          "Call it with: ```\n !save [ID] [Server] [Info] [Link] \n``` "+
          "ID must be a 9 digit number with no spaces."+
          "\n Server must be 'Global' or 'Japan'. Some other variants like JP or GB are accepted."+
          "\n Separate everything with simple spaces."+
          "\n \n OPTIONAL: Add any text info you want after that, and/or a link to a picture of your box."+
          "\n **IMPORTANT!** All links must begin with 'http', copying a picture doesn't count!! \n \n Example: "+
          "\n *!save 123456789 Japan P-Lv.300, I have Lucy and Neko quadmax. https://i.imgur.com/FNtX9gh.jpg* \n \n -"
        },
        {
          name: "!show",
          value: "Show the ID of a user in the chat if he/she has saved it. "+
          "Call it with: ```\n !show @USER \n``` "+
          "You have to MENTION/TAG someone (it can be yourself!)"+
          "\n If the user hasn't registered any info, it will also say so. \n \n -"
        },
        {
          name: "!ihave",
          value: "Save a list of your important captains. "+
          "Call it with: ```\n !ihave [Cap. 1], [Cap. 2], [...] \n``` "+
          "You have to separate each captain with commas and simple spaces."+
          "\n This command is completely independent from !save"+
          "\n Example: *!ihave Sabo Legend, Lucy Legend, Neko* \n \n -"
        },
        {
          name: "!lookingfor",
          value: "Search all the users that have a character. "+
          "Call it with: ```\n !lookingfor [Captain] \n``` "+
          "You can only look for one character per call."+
          "\n This function is completely independent from !show"+
          "\n Example: *!lookingfor Lucy Legend* \n \n -"
        }
      ]
    }})
  }
  
    
  if(command == 'ayuda') {
    //message.reply('text');
    msg.channel.send('Comandos (ES): !guarda, !muestra, !tengo, !buscoa');
    msg.channel.send({embed: {
      color: 16757760,
      author: {
        name: client.user.username,
        icon_url: client.user.avatarURL
      },
      title: "Servicio de AYUDA del Bot",
      description: "Soy un bot que registra y muestra las IDs de OPTC. \n"+
      "Debería estar activo 24/7 y tener el registro actualizado! \n"+
      "Si me ves offline, pregunta qué pasa! \n \n Me puedes llamar con estos comandos:",
      footer: {
        text: "Soy un bot creado por Alados5",
        icon_url: client.user.avatarURL
      },
      fields: [
        {
          name: "!guarda",
          value: "Guarda una ID con una descripción. "+
          "Llamar con: ```\n !guarda [ID] [Versión] [Info] [Link] \n``` "+
          "ID debe ser un número de 9 dígitos sin espacios."+
          "\n Versión debe ser 'Global' o 'Japan'. Valen algunas cosas como JP o GB"+
          "\n Se debe separar todo con espacios sencillos."+
          "\n \n OPCIONAL: Añade cualquier info que quieras escribiendo algo después de eso y/o con un link a una foto de tu box."+
          "\n **IMPORTANTE!** Todos los links deben empezar con 'http'. No vale copiar foto!! \n \n Ejemplo: "+
          "\n *!guarda 123456789 Japan P-Lv.300, Tengo Lucy y Neko quadmax https://i.imgur.com/FNtX9gh.jpg* \n \n -"
        },
        {
          name: "!muestra",
          value: "Muestra la ID de un usuario del chat si ha guardado sus datos. "+
          "Llamar con: ```\n !muestra @USER \n``` "+
          "Tienes que MENCIONAR a alguien (puedes ser tú mismo!)."+
          "\n Si el usuario no ha registrado su info, se avisará. \n \n -"
        },
        {
          name: "!tengo",
          value: "Guarda una lista de capitanes importantes. "+
          "Llamar con: ```\n !tengo [Capi 1], [Capi 2], [...] \n``` "+
          "Hay que separar cada capitán con comas y espacios simples."+
          "\n Esta función es totalmente independiente de !guarda"+
          "\n Ejemplo: *!tengoa Sabo Legend, Lucy Legend, Neko* \n \n -"
        },
        {
          name: "!buscoa",
          value: "Busca los usuarios que tengan un personaje concreto. "+
          "Llamar con: ```\n !buscoa [Capitán] \n``` "+
          "Sólo se puede buscar a un personaje por llamada."+
          "\n Esta función es totalmente independiente de !muestra"+
          "\n Ejemplo: *!buscoa Lucy Legend* \n \n -"
        }
      ]
    }})
  }
  
//------------------------------------------------------------------------- END HELP
  
//------------------------------------------------------------------------- START SAVE
  
  
  if(command == 'save') {
    if(isNaN(args[0]) == true) return msg.reply('Enter your ID number after !save')
    else if(args[0].length !== 9) return msg.reply('Your ID must have 9 digits, no spaces nor commas')
    
    if (JPdic.indexOf(args[1].toLowerCase()) >= 0) {
      args[1] = "Japan";
    }
    else if (GLdic.indexOf(args[1].toLowerCase()) >= 0) {
      args[1] = "Global";
    }
    else {
      return msg.reply('Specify Japan or Global after your ID')
    }
    //if(args[1] !== "Japan" && args[1] !== "Global") return msg.reply('Specify Japan or Global after your ID')

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

  
  if(command == 'guarda') {
    if(isNaN(args[0]) == true) return msg.reply('Pon tu ID después de !guarda. 9 números seguidos')
    else if(args[0].length !== 9) return msg.reply('Tu ID debe tener 9 dígitos, sin espacios ni comas')
    
    if (JPdic.indexOf(args[1].toLowerCase()) >= 0) {
      args[1] = "Japan";
    }
    else if (GLdic.indexOf(args[1].toLowerCase()) >= 0) {
      args[1] = "Global";
    }
    else {
      return msg.reply('Especifica Japan o Global después de tu ID')
    }
    //if(args[1] !== "Japan" && args[1] !== "Global") return msg.reply('Specify Japan or Global after your ID')

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
    
    msg.channel.send(msg.author.username+" ha guardado su ID ("+args[0]+") del servidor: "+args[1])
    //msg.channel.send("It works for now")
  }  
  
  
//------------------------------------------------------------------------- END SAVE
  
//------------------------------------------------------------------------- START SHOW
  
  if(command == 'show') {
    if (msg.mentions.members.first() == undefined) return msg.reply("Mention a user (with @)")
    const wanteduser = msg.mentions.members.first().user.username;
    if (!wanteduser) return msg.reply('Mention a user')
    const allinfo = id_list[wanteduser];
    if (allinfo == undefined) return msg.reply('This user is not registered')

    msg.channel.send({embed: {
      color: 16757760,
      footer: {
        text: "I'm a bot created by Alados5  |  I should be online 24/7",
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
          name: "Additional info",
          value: allinfo.info
        }
      ]
    }})
  }

  if(command == 'muestra') {
    if (msg.mentions.members.first() == undefined) return msg.reply("Menciona a un usuario (con @)")
    const wanteduser = msg.mentions.members.first().user.username;
    if (!wanteduser) return msg.reply('Menciona a un usuario')
    const allinfo = id_list[wanteduser];
    if (allinfo == undefined) return msg.reply('Este usuario no está registrado')

    msg.channel.send({embed: {
      color: 16757760,
      footer: {
        text: "Soy un bot creado por Alados5  |  Debería funcionar 24/7",
        icon_url: client.user.avatarURL
      },
      image: {
        url: allinfo.link
      },
      fields: [
        {
          name: "Nombre (en Discord)",
          value: wanteduser
        },
        {
          name: "Servidor",
          value: allinfo.server
        },
        {
          name: "ID",
          value: allinfo.id
        },
        {
          name: "Info adicional",
          value: allinfo.info
        }
      ]
    }})
  }  

  
//------------------------------------------------------------------------- END SHOW

//------------------------------------------------------------------------- START IHAVE
  
  if(command == 'ihave' || command == 'tengo') {
    var tostore = msg.content.slice(7).toLowerCase();
    tostore = tostore.split(', ');
    var stored = [];
    var correct = 0;
    for(item=0; item<tostore.length; item++) {
      var charid = findnum(tostore[item], dpj);
      if(charid == '-1') {
        msg.channel.send('Error: ' + tostore[item])
      }
      else {
        stored.push(charid);
        correct += 1;
      }
    }
    lf_list[msg.author.username] = stored;
    
    msg.reply(correct + ' OK!')
    
  }
  
//------------------------------------------------------------------------- END IHAVE    
  
//------------------------------------------------------------------------- START LOOKINGFOR
  
  if(command == 'lookingfor') {
    var tolook = msg.content.slice(12).toLowerCase();
    var lookid = findnum(tolook, dpj);
    var users = '';
    for(var key in lf_list) {
      if (lf_list.hasOwnProperty(key)) {
        var user = key;
        var idlist = lf_list[key];
        for(id=0; id<idlist.length; id++) {
          if(idlist[id] == lookid) {
            users += user;
            users += ', ';
          }
        }
      }      
    }
    if(users == '') return msg.reply('No registered users have ' + msg.content.slice(12))
    
    msg.channel.send('These users have ' + msg.content.slice(12) + ': \n' + users.slice(0,-2))
  }
  
  if(command == 'buscoa') {
    var tolook = msg.content.slice(8).toLowerCase();
    var lookid = findnum(tolook, dpj);
    var users = '';
    for(var key in lf_list) {
      if (lf_list.hasOwnProperty(key)) {
        var user = key;
        var idlist = lf_list[key];
        for(id=0; id<idlist.length; id++) {
          if(idlist[id] == lookid) {
            users += user;
            users += ', ';
          }
        }
      }      
    }
    if(users == '') return msg.reply('Ningún usuario registrado tiene a ' + msg.content.slice(8))
    
    msg.channel.send('Estos usuarios tienen a ' + msg.content.slice(8) + ': \n' + users.slice(0,-2))
  }
  
//------------------------------------------------------------------------- END LOOKINGFOR  
  
//------------------------------------------------------------------------- START NAMES  

  if (command == 'names') {
    var chartolook = msg.content.slice(7).toLowerCase();
    var charid = findnum(chartolook, dpj);
    if (charid == '-1') return msg.channel.send('Character Name Error')
    var lnames = dpj[charid];
    lnames = lnames.toString();
    lnames = lnames.replace(/,/g, ', ');
    lnames = '```' + lnames + '```';
    msg.channel.send(lnames)
  }  
  
//------------------------------------------------------------------------- END NAMES
  
});


// THIS  MUST  BE  THIS  WAY
client.login(process.env.BOT_TOKEN);
