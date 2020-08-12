
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

client.on('message',message =>{

 

    let args = message.content.substring(prefix.length).split(" ");
    switch(args[0]){
        case 'play':
            
            function play(connection,message){
                var server = servers[message.guild.id];

                server.dispatcher = connection.play(ytdl(server.queue[0],{filter: 'audioonly'}));
                server.queue.shift();
                server.dispatcher.on("end",function(){
                    if(server.queue[0]){
                        play(connection,message);
                    }else {
                        connection.disconnect();
                    }
                });

            }

            if(!args[1]){
                message.channel.send("you need to provide a link");
                return;
            }
            if(!message.member.voice.channel){
                message.channel.send("you must be in a channel to play the bot !");
                return;
            }

            if(!servers[message.guild.id]) servers[message.guild.id]={
                queue :[]
            }
            var server = servers[message.guild.id];

            server.queue.push(args[1]);

            if(!message.guild.voiceConnection) 
            message.member.voice.channel.join().then(function(connection){
                play(connection,message);
            })

            break;
        case 'skip':
                var server = servers[message.guild.id];
                if(server.dispatcher) server.dispatcher.end();
                message.channel.send("song skipped")
        break;

        case 'stop':
                var server = servers[message.guild.id];
                if(message.guild.voiceConnection){
                    for(var i=server.queue.length -2;i>=0;i--){
                        server.queue.splice(i,1);
                    }
                    server.dispatcher.end();
                    message.channel.send("Ending the queue leaving the voice channel")
                    console.log('stopped the queue')
                }
                if(message.guild.connection) message.guild.voiceConnection.disconnect();
        
        break;
    }
})


client.login(token);


