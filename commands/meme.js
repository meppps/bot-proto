const discord = require('discord.js');
const https = require('https');

exports.run = async(client, prefix, entire, message, args, config) =>{

    msg = message;
    var subreddit = msg.content;
    subreddit = (subreddit.substring('\'meme '.length));

    // console.log(subreddit);
    if(! subreddit){
        msg.channel.send('Please enter a valid subreddit example: \'meme funny');
        return;
    }else{

   

    https.get(`https://www.reddit.com/r/${subreddit}.json`, res => {
        console.log(res.statusCode);
    
        let body = '';
        res.on('data', data => {
        
            body += data;
        });

        res.on('end', ()=>{
            
        function getMeme(subreddit){
    
                var response = JSON.parse(body);
                var children = response.data.children;
                var urls = [];
                
                children.forEach((child)=>{
    
                    var values = Object.values(child.data);
                    values.forEach((value)=>{
                            var key = String(value)
                            if(key.startsWith('https://i.redd.it/')){
    
                                urls.push(key);
                            }
                    })
    
                })
    
                
                var max = urls.length;
                var num = Math.floor(Math.random() * max) + 1  
                
    
                var selectMeme = urls[num];
                console.log(selectMeme);
                return(selectMeme)
    
        }
        // getMeme();
        msg.channel.send(getMeme());
    
    })

})

}}