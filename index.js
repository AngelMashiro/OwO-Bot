const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json');

client.on('ready', () => {
  console.log("Ready");
  client.user.setActivity("owo's", {type: 'WATCHING'});
});

client.on('message', async message => {
  if (message.author.bot) return;

  if (message.content.toLowerCase().includes("owo")) {
    const vc = message.member.voiceChannel;
    if (message.guild.me.voiceChannel) return;
    if (!vc) return;
    if (!vc.joinable) return;

    vc.join()
      .then(connection => {
        const dispatcher = connection.playFile('./aaaa.mp3');
        dispatcher.on('end', () => {
          vc.leave();
        })
      })
      .catch(console.error);


  }
})

process.on('unhandledRejection', (error) => {
  console.log('Unhandled Rejection:\n' + error.stack);
  // application specific logging, throwing an error, or other logic here
});

client.login(config.token);
