const Discord = require('discord.js');
const client = new Discord.Client();
//const fs = module.require("fs");

var id_list = {};
var lf_list = {};
var rem = 0;
const prefix = '!';

const ownerID = "284104569586450434";
const botID = "402991299776741397";

const dbchanID = "407317321145778177";       //Channel: ID Database
const prelchanID = "404763699924959233";     //Channel: ID Preloads

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

function sendAllData(datatype) {
  var database = '';
  var messages = [];
  var limitmsg = 0;
  if (datatype == 'ID') {
    for (var key in id_list) {
      if (id_list.hasOwnProperty(key)) {
        database += key + ' ; ';
        database += id_list[key]['id'] + ' ; ';
        database += id_list[key]['server'] + ' ; ';
        database += id_list[key]['info'] + ' ; ';
        database += id_list[key]['link'] + ';; \n';
        limitmsg += 1;
        if(limitmsg >= 10) {
          messages.push(database.slice(0,-2));
          database = '';
          limitmsg = 0;
        }
      }
    }
    if (database != '') messages.push(database.slice(0,-2));
    return messages
  }
  else if (datatype == 'PJ') {
    for (var key in lf_list) {
      if (lf_list.hasOwnProperty(key)) {
        database += key + ' ; ';
        database += lf_list[key] + ';; \n';
        limitmsg += 1;
        if(limitmsg >= 10) {
          messages.push(database.slice(0,-2));
          database = '';
          limitmsg = 0;
        }
      }
    }    
    if (database != '') messages.push(database.slice(0,-2));
    return messages
  }
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
    if(command == 'mybot') {
      msg.reply('What is thy bidding, my Master?')
    }
    
//------------------------------------------------------------------------- START ALLDATA    
    if(command == 'alldata') {
      if(args[0].toLowerCase() == 'id') {
        var alldataids = sendAllData('ID');
        for(m=0; m<alldataids.length; m++) {
         msg.channel.send(alldataids[m])
        }
      }
      else if(args[0].toLowerCase() == 'pj') {
        var alldatapjs = sendAllData('PJ');
        for(m=0; m<alldatapjs.length; m++) {
         msg.channel.send(alldatapjs[m])
        }
      }
      else msg.channel.send("You didn't specify a data type")
    }
    
//------------------------------------------------------------------------- END ALLDATA    
    
//------------------------------------------------------------------------- START DELETE 

    if(command == 'delete') {    
      var deluser = msg.content.slice(12);
      if (deluser == '') return msg.reply("Specify a user")
      
      delete id_list[deluser];
      delete lf_list[deluser];

      msg.channel.send('Deleted all info of '+ deluser)

    }
    
//------------------------------------------------------------------------- END DELETE
    
  } // END ADMIN COMMANDS
  
//------------------------------------------------------------------------- START BOT&OWNER COMMANDS
  if(msg.author.id == botID || msg.author.id == ownerID) {
    
//------------------------------------------------------------------------- START SPAM 
//    if(command == 'spam') {    
//      var action = msg.content.slice(6);
//      if (action == '') return msg.reply("Action Required")
//      else if (action == '1') {
//        msg.reply('You activated the Bot Sleep Prevention Procedure')
//        myInterval = setInterval (function () {
//          var now = new Date();
//          var hora = now.getHours();
//          hora += 1;
//          if (hora == 24) hora = 0;
//          if (hora<10) hora = '0' + hora;
//          var mins = now.getMinutes();
//          if (mins<10) mins = '0' + mins;
//          var tnow = hora + ':' + mins; 
//          msg.channel.send("!! - " + tnow + " - Remembering Data...")
//        }, 600000); //every 10 minutes (10*60*1000)
//      }
//      else if (action == '0') {
//        msg.reply('You deactivated the Bot Sleep Prevention Procedure')
//        clearInterval(myInterval);
//      }
//      else {
//        msg.reply('Action Invalid')
//      }
//    } 
//------------------------------------------------------------------------- END SPAM 

  
//------------------------------------------------------------------------- START AUTODATA 
    
    if(command == 'autodata') {
      var alldataids = sendAllData('ID');
      var alldatapjs = sendAllData('PJ');
      for(mi=0; mi<alldataids.length; mi++) {
        msg.channel.send("!PreloadID " + alldataids[mi])
      }
      for(mj=0; mj<alldatapjs.length; mj++) {
        msg.channel.send("!PreloadPJ " + alldatapjs[mj])
      }
    }

//------------------------------------------------------------------------- END AUTODATA
    
//------------------------------------------------------------------------- START PRELOAD  
    
    if (command == 'preloadid') { 
      var bulkdata = msg.content.slice(11);
      if (bulkdata.slice(-2) == ';;') bulkdata = bulkdata.slice(0,-2);
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
      msg.reply("Preloaded ID data!");      
    }
 
    if (command == 'preloadpj') {     
      var bulkdata = msg.content.slice(11);
      if (bulkdata.slice(-2) == ';;') bulkdata = bulkdata.slice(0,-2); 
      var lines = bulkdata.split(';;');
      
      for(j=0; j<lines.length; j++) {
        var parts = lines[j].split(' ; ');
            
        var useri = parts[0];
        useri = useri.replace('\n', '');
        if (useri.slice(0,1) == ' ') {
          useri = useri.slice(1);
        }
        var charstoadd = parts[1].split(',');
            
        lf_list[useri] = charstoadd;
      }       
      msg.reply("Preloaded PJ data!");      
    }
    
//------------------------------------------------------------------------- END PRELOAD
    
  } //END BOT&OWNER COMMANDS
  
//------------------------------------------------------------------------- END ADMIN COMMANDS
  
//------------------------------------------------------------------------- START BOT (SELF) COMMANDS  
//  if(msg.author.id == botID && msg.content.slice(1,2) == '!') {
//    rem += 1;
//    if (rem >= 12) { //12 = 2 hours at 10min/msg
//      msg.channel.send("!spam 0")
//      msg.channel.send("!autodata")
//      msg.channel.send("!spam 1")
//      rem = 0;
//    }
//  }
//------------------------------------------------------------------------- END BOT (SELF) COMMANDS 
  
//------------------------------------------------------------------------- START HELP
  
  if(command == 'help') {
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
  
  
  if(command == 'save' || command == 'guarda') {
    if(command == 'save') {
      var invalidid1 = 'Enter your ID number after !save';
      var invalidid2 = 'Your ID must have 9 digits, no spaces nor commas';
      var invalidserver = 'Specify Japan or Global after your ID. Remember to use simple spaces, not commas';
      var validsavemsg = ' has saved his ID/Server: ';
      var invalidbackup = "There is a problem with the Backup channel. You may lose all data, keep a copy somewhere safe";
    }
    else {
      var invalidid1 = 'Pon tu ID después de !guarda. 9 números seguidos';
      var invalidid2 = 'Tu ID debe tener 9 dígitos, sin espacios ni comas';
      var invalidserver = 'Especifica Japan o Global después de tu ID. Recuerda separar con espacios, sin comas';
      var validsavemsg = ' ha guardado su ID/Servidor: ';
      var invalidbackup = "Hay un problema con el canal de Backup. Puede ser que tus datos se pierdan, haz una copia segura";
    }
    
    if(isNaN(args[0]) == true) return msg.reply(invalidid1)
    else if(args[0].length !== 9) return msg.reply(invalidid2)
    
    if (JPdic.indexOf(args[1].toLowerCase()) >= 0) {
      args[1] = "Japan";
    }
    else if (GLdic.indexOf(args[1].toLowerCase()) >= 0) {
      args[1] = "Global";
    }
    else {
      return msg.reply(invalidserver)
    }

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
    
    msg.channel.send(msg.author.username + validsavemsg + args[0] + " / " + args[1])
    
    let dbchan = client.channels.find("id", dbchanID);
    if(dbchan) {
      dbchan.send("PreloadID " + msg.author.username + ' ; ' + content.id + ' ; ' + content.server + ' ; ' + content.info + ' ; ' + content.link)
      //!PreloadID Username ; ID ; Server ; Text ; http---.png;; 
    }
    else {
      msg.reply(invalidbackup)
    }
    
  }
  
//------------------------------------------------------------------------- END SAVE
  
//------------------------------------------------------------------------- START SHOW
  
  if(command == 'show' || command == 'muestra') {
    if(command == 'show') {
      var nomention = 'Mention a user (with @)';
      var invalidmention = 'Mention a valid user';
      var noregisteredmsg = 'This user is not registered';
      var footertxt = "I'm a bot created by Alados5  |  I should be online 24/7";
      var embedtxt = ["User Name (in Discord)", "Server", "Additional info"];
    }
    else {
      var nomention = 'Menciona a un usuario (con @)';
      var invalidmention = 'Menciona a un usuario válido';
      var noregisteredmsg = 'Este usuario no está registrado';
      var footertxt = "Soy un bot creado por Alados5  |  Debería funcionar 24/7";
      var embedtxt = ["Nombre (en Discord)", "Servidor", "Info adicional"];
    }
    
    if (msg.mentions.members.first() == undefined) return msg.reply(nomention)
    const wanteduser = msg.mentions.members.first().user.username;
    if (!wanteduser) return msg.reply(invalidmention)
    const allinfo = id_list[wanteduser];
    if (allinfo == undefined) return msg.reply(noregisteredmsg)

    msg.channel.send({embed: {
      color: 16757760,
      footer: {
        text: footertxt,
        icon_url: client.user.avatarURL
      },
      image: {
        url: allinfo.link
      },
      fields: [
        {
          name: embedtxt[0],
          value: wanteduser
        },
        {
          name: embedtxt[1],
          value: allinfo.server
        },
        {
          name: "ID",
          value: allinfo.id
        },
        {
          name: embedtxt[2],
          value: allinfo.info
        }
      ]
    }})
  }

//------------------------------------------------------------------------- END SHOW

//------------------------------------------------------------------------- START IHAVE
  
  if(command == 'ihave' || command == 'tengo') {
    var tostore = msg.content.slice(7).toLowerCase();
    if(tostore == '') return msg.reply("Write the important captains you have, separated by commas!")
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
    var useri = msg.author.username;
    if(!lf_list[useri]) {
      lf_list[useri] = stored;
      msg.reply("Created a list of: " + correct + ' captains!')
    }
    else {
      for(i=0;i<stored.length;i++) {
        if(lf_list[useri].indexOf(stored[i]) == -1) {
          lf_list[useri].push(stored[i]);
        }
      }
      msg.reply("Updated your list with: " + correct + ' captains!')
    }
    
    let dbchan = client.channels.find("id", dbchanID);
    if(dbchan) {
      dbchan.send("PreloadPJ " + useri + ' ; ' + lf_list[useri])
      //!PreloadPJ User ; 0998,0999,1000,1001,1002;;
    }
    else {
      msg.reply("There is a problem with the Backup channel. You may lose all data, keep a copy somewhere safe")
    }
    
  }
  
//------------------------------------------------------------------------- END IHAVE    
  
//------------------------------------------------------------------------- START LOOKINGFOR
  
  if(command == 'lookingfor' || command == 'buscoa') {
    if(command == 'lookingfor') {
      var chartl = msg.content.slice(12);
      var incmsg = 'No registered users have ';
      var nochar = 'Invalid Character Name!';
      var cormsg = 'These users have ';
    }
    else {
      var chartl = msg.content.slice(8);
      var incmsg = 'Ningún usuario registrado tiene a ';
      var nochar = 'Nombre de Personaje No Válido!';
      var cormsg = 'Estos usuarios tienen a ';
    }
    var tolook = chartl.toLowerCase();
    var lookid = findnum(tolook, dpj);
    if (lookid == '-1') return msg.reply(nochar) 
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
    if(users == '') return msg.reply(incmsg + chartl)
    
    msg.channel.send(cormsg + chartl + ': \n' + users.slice(0,-2))
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
  
//------------------------------------------------------------------------- START BACKUP  
  
  if (command == 'backup') {
    let dbchan = client.channels.find("id", dbchanID);
    if(dbchan) {
        dbchan.fetchMessages({ limit: 20 })
          .then(messages => {

            let prelchan = client.channels.find("id", prelchanID);
            if(prelchan) {
              var lmsg = messages.array()
              for(m = lmsg.length-1; m >= 0; m--) {
                prelchan.send("!" + lmsg[m].content)
              }
            }
            else {
              msg.channel.send("Error in Backup Channel");
            }
          
          })
          .catch(msg.channel.send("Reloading data. Please wait a few seconds to retry!"));
    }
    else {
        msg.channel.send("Error in Saves Channel");
    }

  }
  
//------------------------------------------------------------------------- END BACKUP  
  
});


// THIS  MUST  BE  THIS  WAY
client.login(process.env.BOT_TOKEN);
