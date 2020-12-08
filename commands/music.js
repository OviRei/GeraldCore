const ytdl = require('ytdl-core');
const yts = require('yt-search');
const fs = require("fs");
const Discord = require("discord.js");
const { color } = require("../data/config.json");
module.exports = {
    name: 'music',
    description: 'Music Controller: \n Play: plays a song from YouTube \n Stop: stops current playback',
    usage: '/music play [Song title / YT URL] \n /music stop',
    class: 'Entertaining',
    requiresArgs: true,
    utterances: ["play music", "play me music", "music from youtube", "youtube music", "play", "pause", "stop"],
    execute(msg, args, client) {
        const voiceChannel = msg.member.voice.channel;
        const command = args[0];
        let titleArray = args;
        titleArray.shift()
        const videoID = titleArray.join(" ");
        const id = msg.guild.id;
        var url;
        if (command === "stop") {
            voiceChannel.leave();
        } else if (command === "play") {
            yts(videoID).then(res => {
                const videos = res.videos;
                video = videos[0];
                url = video.url;
                //Initial Checks
                if (!url) {
                    return msg.channel.send("You need to supply a song title **OR** YouTube URL")
                }

                if (!voiceChannel) {
                    return msg.channel.send("You need to join a voice channel first");
                }
                //Join VC
                voiceChannel.join().then(connection => {
                    const musicEmbed = new Discord.MessageEmbed()
                        .setTitle(video.title)
                        .setURL(video.url)
                        .addField("Duration", video.timestamp, true)
                        .setThumbnail(video.thumbnail)
                        .addField("Views", video.views, true)
                        .setColor(color)
                    msg.channel.send(musicEmbed);
                    //Download track and write to file
                    const stream = ytdl(url, { filter: 'audioonly', quality: 'highestaudio', highWaterMark: 1 << 25 });
                    stream.pipe(fs.createWriteStream('./data/music/' + id + '.ogg')).on('finish', () => {
                        //Play in VC
                        console.log("Downloaded succesfully. Playback started");
                        const dispatcher = connection.play(fs.createReadStream('./data/music/' + id + '.ogg', { type: 'ogg/opus', highWaterMark: 1000 }));
                        //Leave VC
                        dispatcher.on('finish', () => {
                            voiceChannel.leave();
                            console.log("Playback Completed");
                        });
                    });
                });
            })
        } else {
            return msg.channel.send("You need to specify a command **Play/Stop**")
        }
    },
};