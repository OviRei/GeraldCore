const https = require('https');
const discord = require("discord.js");
const { color } = require("../data/config.json");
module.exports = {
    name: 'apod',
    description: "Get NASA's Astronomy Picture Of the Day",
    usage: '/apod',
    class: 'Random',
    requiresArgs: false,
    utterances: ["show me space", "pictures of space", "space pictures", "astronomy pictures", "show me nasa", "nasa"],
    execute(msg, args, client) {
        https.get('https://api.nasa.gov/planetary/apod?api_key=lCJQbMiUG6iZMQdas8Qcg2IQ8KQmC19Ssuhc84pi', (res) => {
            let data = '';
            res.on('data', (chunk) => {
                data += chunk;
            });
            res.on('end', () => {
                res = JSON.parse(data);
                const apodEmbed = new discord.MessageEmbed()
                    .setColor(color)
                    .setTitle(res.title)
                    .setURL(res.hdurl)
                    .setImage(res.url)
                    .setFooter("Data from NASA", "https://cdn.freebiesupply.com/logos/large/2x/nasa-1-logo-png-transparent.png")
                msg.channel.send(apodEmbed);
            });
        }).on("error", (err) => {
            console.log("Error: " + err.message);
        });
    },
};