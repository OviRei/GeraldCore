const yts = require('yt-search');
const Discord = require("discord.js");
const { color } = require("../data/config.json");
module.exports = {
    name: 'ytsearch',
    description: 'Search YouTube with a specified search string',
    usage: '/ytsearch [search string]',
    class: 'Useful',
    requiresArgs: true,
    utterances: [],
    execute(msg, args, client) {
        const videoID = args.join(" ");
        yts(videoID).then(res => {
            const videos = res.videos;
            const video = videos[0];
            const videoEmbed = new Discord.MessageEmbed()
                .setTitle("Found video: " + video.title)
                .setURL(video.url)
                .addField("Duration", video.timestamp, true)
                .setThumbnail(video.thumbnail)
                .addField("Views", video.views, true)
                .setColor(color)
            msg.channel.send(videoEmbed);
        });
    },
};