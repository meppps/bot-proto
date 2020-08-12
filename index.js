
const Discord = require('discord.js');
const https = require("https");

const config = require('./config.json');
const token = (config.token);

const client = new Discord.Client();
var defaultsub;
var servers = {};
const prefix = "'";
const ytdl = require("ytdl-core");


// const ytdl = require("ytdl-core");
// const puppeteer = require('puppeteer');

client.on('ready',()=>{
    console.log('Bot Jr. is Online');

    
client.on("message", (message) => {

    // Exit and stop if it's not there
    if (!message.content.startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).split(' ');
    const command = args.shift().toLowerCase();
    const entire = message.content;



    try {
        let commandFile = require(`./commands/${command}.js`);
        commandFile.run(client, prefix, entire, message, args, config, servers)
    }catch (err) {
        console.log(err)
        return;
    }

  
  });


});

// client.on('message',message =>{

    
// })


client.login(token);


