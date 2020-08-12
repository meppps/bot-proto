const discord = require('discord.js');
const https = require('https');
const ytdl = require("ytdl-core");

exports.run = async(client, prefix, entire, message, args, config, servers) => {
    

    var song = message.content.substring('\'play '.length); 
    console.log(song);

    let arguments = message.content.substring(prefix.length).split(" ");
    console.log(arguments)

    switch(arguments[0]){
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

            if(!arguments[1]){
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

            server.queue.push(arguments[1]);

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


    

}