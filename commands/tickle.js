const discord = require("discord.js");
const { color } = require("../data/config.json");
const http = require('http');
module.exports = {
    name: 'tickle',
    description: 'tickle someone!',
    usage: '/tickle [@user#1234]',
    class: 'Wholesome',
    requiresArgs: true,
    utterances: ["tickle someone", "tickle", "tickle someone", "wholesome"],
    execute(msg, args, client) {
        var url = "http://api.nekos.fun:8080/api/tickle";
        user = msg.mentions.users.first();
        if (!user) {
            return msg.channel.send("You need to mention someone!");
        }
        http.get(url, (resp) => {
            let data = '';
            resp.on('data', (chunk) => {
                data += chunk;
            })
            resp.on('end', () => {
                img = JSON.parse(data).image;
                const embed = new discord.MessageEmbed()
                    .setAuthor(msg.author.username + " tickled " + msg.mentions.users.first().username + " :)")
                    .setColor(color)
                    .setImage(img)
                msg.channel.send(embed);
            });
        })
    },
};