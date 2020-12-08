const discord = require("discord.js");
const { color } = require("../data/config.json");
module.exports = {
    name: 'nom',
    description: 'Nom someone!',
    usage: '/nom [@user#1234]',
    class: 'Wholesome',
    requiresArgs: true,
    utterances: ["nom someone", "wholesome", "nom a member"],
    execute(msg, args, client) {
        const img = [
            "https://media1.tenor.com/images/c22a247affcf4cd02c7d17f5a432cd95/tenor.gif?itemid=8259627",
            "https://i.imgur.com/Ryy3D7r.gif",
            "https://data.whicdn.com/images/279560594/original.gif",
            "https://i.gifer.com/TuLu.gif",
            "https://i.imgur.com/xKJw3mX.gif",
            "https://media1.tenor.com/images/0d192209c8e9bcd9826af63ba72fc584/tenor.gif?itemid=15164408",
            "https://media1.tenor.com/images/c688d2cf5c50569c74ce8e8d87c40935/tenor.gif?itemid=13341413",
            "https://i.gifer.com/IDRa.gif",
            "https://i.pinimg.com/originals/59/6e/72/596e723a419d19ed784dfb546723018e.gif",
            "https://i.kym-cdn.com/photos/images/original/001/443/180/d25.gif"
        ];

        function getRandomInt(max) {
            return Math.floor(Math.random() * Math.floor(max));
        };
        itemNumber = getRandomInt(img.length);
        user = msg.mentions.users.first();
        if (!user) {
            return msg.channel.send("You need to mention someone!");
        }
        const embed = new discord.MessageEmbed()
            .setAuthor(msg.author.username + " nommed " + msg.mentions.users.first().username + " :)")
            .setColor(color)
            .setImage(img[itemNumber])
        msg.channel.send(embed);
    },
};