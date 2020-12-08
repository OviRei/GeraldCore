const Discord = require("discord.js");
const { color } = require('../data/config.json');
const fs = require("fs");
module.exports = {
    name: 'citrus',
    description: 'Guess that citrus! You have 15 seconds to enter the correct name of the citrus shown!',
    usage: '/citrus (to begin game) \nGuess by entering the name of the citrus \n/citrus get (lists citrus options)',
    class: 'Entertaining',
    requiresArgs: false,
    utterances: ["i want to play a game", "fruit guess", "guess the citrus", "citrus guesser", "guessing game"],
    execute(msg, args) {
        var fruitNames = [
            "lemon",
            "grapefruit",
            "orange",
            "lime",
            "pomelo",
            "yuzu",
            "orangelo",
            "citron",
            "kumquat",
            "bergamot",
            "finger lime",
            "cantaloupe",
            "watermelon",
            "pumpkin",
            "honeydew melon"
        ];
        var images = [
            "https://share.upmc.com/wp-content/uploads/2014/10/lemon.png",
            "https://i.ndtvimg.com/mt/cooks/2014-11/grapefruit.jpg",
            "https://www.quanta.org/orange/orange.jpg",
            "https://www.allmychefs.com/images/968/1200-auto/fotolia_60158073_subscription_l-copy.jpg?poix=50&poiy=50",
            "https://images-na.ssl-images-amazon.com/images/I/71kEAwiVH1L._AC_SL1500_.jpg",
            "https://img1.mashed.com/img/gallery/the-perfect-yuzu-juice-substitute/intro-1564609031.jpg",
            "https://i.pinimg.com/originals/e5/20/2b/e5202b706069b594f6ab828af0f9d038.jpg",
            "https://specialtyproduce.com/sppics/8713.png",
            "https://producemadesimple.ca/wp-content/uploads/2015/04/kumquat-2-ss.jpg",
            "https://cdn11.bigcommerce.com/s-295z9o5zsa/images/stencil/1280x1280/products/719/1955/Bergamot_orange_iso_edited_square__66892.1552850001.jpg?c=2",
            "https://www.nature-and-garden.com/wp-content/uploads/sites/4/2018/10/australian-finger-lime.jpg",
            "https://seedworld.com/site/wp-content/uploads/2019/01/GettyImages-845261084.jpg",
            "https://specialtyproduce.com/sppics/11357.png",
            "https://www.liveeatlearn.com/wp-content/uploads/2015/10/pumpkin-photo-1.jpg",
            "https://groceries.morrisons.com/productImages/210/210305011_0_640x640.jpg?identifier=6ff605c91cd0384439fa1acbd7de32a1"
        ];
        if (args[0] === "get") {
            var str = fruitNames.join(", ");
            const citrusNamesEmbed = new Discord.MessageEmbed()
                .setColor(color)
                .setTitle('Guess That Citrus!')
                .addField('Citrus Names', str, true)
            msg.channel.send(citrusNamesEmbed);
        } else {
            function getRandomInt(max) {
                return Math.floor(Math.random() * Math.floor(max));
            };
            itemNumber = getRandomInt(fruitNames.length);
            const gameStartEmbed = new Discord.MessageEmbed()
                .setColor(color)
                .setTitle(msg.member.user.tag + ', Guess That Citrus, You have 15 seconds!')
                .setImage(images[itemNumber])
            msg.channel.send(gameStartEmbed);

            const filter = m => m.author.id === msg.author.id;
            const collector = msg.channel.createMessageCollector(filter, { max: 1, time: 15000, errors: ['time'] });
            collector.on('collect', collected => {
                reply = collected.content.toLowerCase();
                if (reply === fruitNames[itemNumber]) {
                    msg.channel.send("Correct! 🎉 The Citrus was **" + fruitNames[itemNumber] + "**")
                } else {
                    msg.channel.send("Incorrect! ❌ The Citrus was **" + fruitNames[itemNumber] + "**")
                }
            });
            collector.on('end', collected => {
                var i;
                collected.map(c => i++)
                if (collected.size < 1) {
                    msg.channel.send("Time's up! ⏰ The citrus was **" + fruitNames[itemNumber] + "**")
                }
            });
        }
    },
};