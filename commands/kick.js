const discord = require('discord.js');
const https = require('https');

exports.run = async(client, prefix, entire, message, args, config) =>{
    
    var guild = message.guild;
    var member = new discord.GuildMember(client, {}, guild);
    console.log(member.guild.members.guild.members);
    
}