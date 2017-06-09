// https://discordapp.com/oauth2/authorize?client_id=322576415516131348&scope=bot&permissions=16779280

const Eris = require('eris');
const fs = require('fs');
const path = require('path');
const authDir = path.join(__dirname, 'auth.json');
const auth = fs.readFileSync(authDir);
const token = JSON.parse(auth).token;
const muteTimeout = 5000; // ms

var bot = new Eris(token);

bot.on('ready', function() {
    console.log('Ready!');
});

bot.on('voiceStateUpdate', function(user, voice) {
    if(user.voiceState.selfMute && user.voiceState.selfDeaf) {
        setTimeout(function() {
            if(user.voiceState.selfMute && user.voiceState.selfDeaf) {
                
                var guildID = user.guild.id;
                var afkChannelID = user.guild.afkChannelID;
                var id = user.id;
                var options = {channelID: afkChannelID};
                var reason = "Deaf AFK";
                bot.editGuildMember(guildID, id, options, reason);
                console.log(id + ' moved to afk for deafening');

            }
        }, muteTimeout);
    }
});

bot.connect();