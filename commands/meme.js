const randomPuppy = require('random-puppy');
const { color } = require('../data/config.json');
const Discord = require("discord.js");
module.exports = {
    name: 'meme',
    description: 'Get a random meme',
    usage: '/meme [subreddit] leave blank for a random subreddit',
    class: 'Random',
    requiresArgs: false,
    utterances: ["show me a meme", "show me memes", "memes", "reddit", "subreddit", "random meme"],
    execute(msg, args) {
        const reddit = [
            "Meme",
            "dankmemes",
            "dankmeme",
            "wholesomememes",
            "MemeEconomy",
            "ihadastroke",
            "im14andthisisdeep",
            "NotMyJob",
            "boomerhumour",
            "195",
            "lovesomememes"
        ];
        var subreddit;
        if (!args[0]) {
            subreddit = reddit[Math.floor(Math.random() * reddit.length)];
        } else {
            subreddit = args[0];
        }
        try {
            randomPuppy(subreddit).then(async url => {
                const memeEmbed = new Discord.MessageEmbed()
                    .setColor(color)
                    .setTitle("r/" + subreddit)
                    .setImage(url);
                msg.channel.send(memeEmbed);
            })
        } catch (err) {
            console.error(err);
            msg.channel.send("Invalid Subreddit / No data collected");
        }
    },
};