const discord = require("discord.js");
module.exports = {
    name: 'ship',
    description: 'See if two people are meant to be together!',
    usage: '/ship [name1] [name2]',
    class: 'Random',
    requiresArgs: true,
    utterances: ["ship two people", "ship a relationship", "ship a couple", "ship two names"],
    execute(msg, args, client) {
        var name1 = args[0];
        var name2 = args[1];

        if (!name1 || !name2) {
            return msg.channel.send("You must supply two names!")
        }
        var color;
        var phrase;
        const colors = ["#fc0303", "#fca503", "#03fc0f"];

        function getRandomInt(max) {
            return Math.floor(Math.random() * Math.floor(max));
        };
        var size = getRandomInt(99);
        size++;
        if (size < 20) {
            color = colors[0];
            phrase = "Maybe it's not meant to be :("
        } else if (size < 60) {
            color = colors[1];
            phrase = "This could work out :)"
        } else if (size < 101) {
            color = colors[2];
            phrase = "You're made for eachother :D"
        }

        const ppEmbed = new discord.MessageEmbed()
            .setColor(color)
            .setTitle(name1 + " ❤ " + name2)
            .setDescription("Your love match percentage is " + size + "% " + phrase)
        msg.channel.send(ppEmbed);
    },
};