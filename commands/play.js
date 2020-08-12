const discord = require('discord.js');
const https = require('https');
const ytdl = require("ytdl-core");

exports.run = async(client, prefix, entire, message, args, config) => {
    

    var song = message.content.substring('\'music '.length); 
    console.log(song);

    

}