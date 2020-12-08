const discord = require("discord.js");
const { color } = require("../data/config.json");
const https = require('https');
module.exports = {
    name: 'cuddle',
    description: 'cuddle someone!',
    usage: '/cuddle [@user#1234]',
    class: 'Wholesome',
    requiresArgs: true,
    utterances: ["cuddle someone", "cuddle", "cuddle someone", "wholesome"],
    execute(msg, args, client) {
        var url = "https://www.nekos.life/api/v2/img/cuddle";
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
                    .setAuthor(msg.author.username + " cuddled " + msg.mentions.users.first().username + " :)")
                    .setColor(color)
                    .setImage(img)
                msg.channel.send(embed);
            });
        })
    },
};