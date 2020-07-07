
const Discord = require('discord.js');
const https = require("https");

const config = require('./config.json');
const token = (config.token);

const client = new Discord.Client();
var defaultsub;
var servers = {};
const prefix = "'";


// const ytdl = require("ytdl-core");
// const puppeteer = require('puppeteer');

client.on('ready',()=>{
    console.log('Retard bot Jr. is Online');

    
client.on("message", (message) => {

    // Exit and stop if it's not there
    if (!message.content.startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).split(' ');
    const command = args.shift().toLowerCase();
    const entire = message.content;



    try {
        let commandFile = require(`./commands/${command}.js`);
        commandFile.run(client, prefix, entire, message, args, config)
    }catch (err) {
        console.log(err)
        return;
    }

   




    // if (msg.content.startsWith(prefix + "hi")) {
    //   msg.channel.send("hi retard!");
    // } else
    // if (msg.content.startsWith(prefix + "foo")) {
    //   msg.channel.send("bar!");
    // } 
    
  });


});

client.login(token);


