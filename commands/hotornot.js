const discord = require("discord.js");
module.exports = {
    name: 'hotornot',
    description: 'Does gerald think you\'re attractive? Use this command with an image attachment to find out!',
    usage: '/hotornot [image]',
    class: 'Entertaining',
    requiresArgs: false,
    utterances: [],
    execute(msg, args, client) {
        const colors = ["#fc0303", "#fca503", "#03fc0f"];
        if (!msg.attachments.first()) {
            return msg.channel.send("You need to upload an image you dingus");
        }
        url = msg.attachments.first().url;
        //GETRANDOMINT
        function getRandomInt(max) {
            return Math.floor(Math.random() * Math.floor(max));
        };
        attractiveness = getRandomInt(101);
        if (attractiveness < 35) {
            color = colors[0];
            phrase = "Pretty ugly ngl"
        } else if (attractiveness < 60) {
            color = colors[1];
            phrase = "Not bad!"
        } else if (attractiveness < 102) {
            color = colors[2];
            phrase = "Very sexy 😳";
        }
        const embed = new discord.MessageEmbed()
            .setColor(color)
            .setTitle(attractiveness + "% - " + phrase)
            .setImage(url)
        msg.channel.send(embed);
    },
};