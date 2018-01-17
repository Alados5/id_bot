const Discord = require('discord.js');
const client = new Discord.Client();

var id_list = {};
const prefix = '!';
const ownerID = "284104569586450434";

client.on('ready', () => {
  console.log('Ready');
  client.user.setActivity("!help")
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
  
  
  
  
});





// THIS  MUST  BE  THIS  WAY
client.login(process.env.BOT_TOKEN);
