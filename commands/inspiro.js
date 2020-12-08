const https = require('https');
const discord = require("discord.js");
const { color } = require("../data/config.json");
module.exports = {
    name: 'inspiro',
    description: 'Get inspired by InspiroBot',
    usage: 'inspiro',
    class: 'Random',
    requiresArgs: false,
    execute(msg, args, client) {
        https.get('https://inspirobot.me/api?generate=true', (res) => {
            let data = '';
            res.on('data', (chunk) => {
                data += chunk;
            });
            res.on('end', () => {
                console.log(data);
                const embed = new discord.MessageEmbed()
                    .setColor(color)
                    .setTitle("InspiroBot Says:")
                    .setImage(data)
                    .setFooter("Data from InspiroBot", "https://inspirobot.me/website/images/inspirobot-dark-green.png")
                msg.channel.send(embed);
            });
        }).on("error", (err) => {
            console.log("Error: " + err.message);
        });
    },
};