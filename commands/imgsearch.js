const { color } = require("../data/config.json");
const Discord = require("discord.js");
const gis = require('g-i-s');
module.exports = {
    name: 'imgsearch',
    description: 'Search Google Images for a specified string',
    usage: '/imgsearch [search string]',
    class: 'Useful',
    requiresArgs: true,
    utterances: [],
    execute(msg, args, client) {
        const query = args.join(" ");
        gis(query, logResults);

        function logResults(error, results) {
            if (error) {
                console.log(error);
            } else {
                image = JSON.stringify(results[0].url, null, '  ');
                image = image.substring(1, image.length - 1)
                const imageEmbed = new Discord.MessageEmbed()
                    .setTitle("Image Result:")
                    .setURL(image)
                    .setImage(image)
                    .setColor(color)
                msg.channel.send(imageEmbed);
            }
        }
    },
};