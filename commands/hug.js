const discord = require("discord.js");
const { color } = require("../data/config.json");
const https = require('https');
module.exports = {
    name: 'hug',
    description: 'Hug someone!',
    usage: '/hug [@user#1234]',
    class: 'Wholesome',
    requiresArgs: true,
    utterances: ["hug someone", "cuddle", "cuddle someone", "wholesome"],
    execute(msg, args, client) {
        var url = "https://www.nekos.life/api/v2/img/hug";
        user = msg.mentions.users.first();
        if (!user) {
            return msg.channel.send("You need to mention someone!");
        }
        https.get(url, (resp) => {
            let data = '';
            resp.on('data', (chunk) => {
                data += chunk;
            })
            resp.on('end', () => {
                img = JSON.parse(data).url;
                const embed = new discord.MessageEmbed()
                    .setAuthor(msg.author.username + " hugged " + msg.mentions.users.first().username + " :)")
                    .setColor(color)
                    .setImage(img)
                msg.channel.send(embed);
            });
        })
    },
};