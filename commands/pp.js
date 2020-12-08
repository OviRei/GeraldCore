const discord = require("discord.js");
module.exports = {
    name: 'pp',
    description: 'Get your professionally measured PP size',
    usage: '/pp',
    class: 'Random',
    requiresArgs: false,
    execute(msg, args, client) {
        var color;
        var phrase;
        const colors = ["#fc0303", "#fca503", "#03fc0f"];

        function getRandomInt(max) {
            return Math.floor(Math.random() * Math.floor(max));
        };
        var size = getRandomInt(11);
        size++;
        if (size < 5) {
            color = colors[0];
            phrase = "Pathetic!"
        } else if (size < 9) {
            color = colors[1];
            phrase = "Not bad!"
        } else if (size < 13) {
            color = colors[2];
            phrase = "Nice!"
        }

        if (msg.author.id == 341300268660555778) {
            color = colors[2];
            size = "YEEEEEEEEEEESSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS";
            phrase = "Gargantuan."
        }

        console.log(size);
        const ppEmbed = new discord.MessageEmbed()
            .setColor(color)
            .setTitle("The Magical PP Measuring Machine")
            .setDescription("Your pp is " + size + " inches. " + phrase)
        msg.channel.send(ppEmbed);
    },
};