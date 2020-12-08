const Discord = require("discord.js");
const { color } = require('../data/config.json');
var mongo = require('mongodb-wrapper');
var db = mongo.db('localhost', 27017, 'Gerald');
db.collection('userstat');
module.exports = {
    name: 'level',
    description: 'Get your user level / someone else\'s user level ',
    usage: '/level [@user#1234]',
    class: 'Useful',
    requiresArgs: false,
    utterances: ["what level am i", "rank", "what rank am i", "xp", "levels"],
    execute(msg, args, client) {
        if (msg.channel.type == "dm") {
            return msg.channel.send("This is a guild-only command!");
        }
        if (!args[0]) {
            user = msg.author;
        } else {
            user = msg.mentions.users.first();
        }
        //try {
        const member = msg.guild.member(user);
        db.userstat.find({ ID: member.id }).toArray(function(err, posts) {
            if (!posts.length) {
                msg.channel.send("No data / invalid mention");
            } else {
                var experience = posts[0].XP;
                var rankNumber = posts[0].LEVEL;
                var xpToNext = (rankNumber * 30 ** 2) - experience;
                const embed = new Discord.MessageEmbed()
                    .setColor(color)
                    .setThumbnail(user.avatarURL())
                    .addField(`${user.tag}`, `${user}`, false)
                    .addField("🎖 XP: ", "`" + experience + "`", true)
                    .addField("🎖 Level: ", "`" + rankNumber + "`", true)
                    .addField("🎖 XP to next level: ", "`" + xpToNext + "`", true)
                msg.channel.send(embed);
            }
        })

    },
};