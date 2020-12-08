const Discord = require("discord.js");
const { color } = require("../data/config.json");
module.exports = {
    name: 'deathmatch',
    description: 'Witness a fight to the death between two members!',
    usage: '/deathmatch [@user1] [@user2] \nPress 📋 to see the battle report!',
    class: 'Entertaining',
    requiresArgs: true,
    utterances: ["fight to the death", "fight", "battle"],
    execute(msg, args, client) {
        var attacks = ["slaps", "punches", "stabs", "shoots", "fish smacks", "impales", "clobbers", "twats", "flicks", "impolitely nudges", "violently shakes", "unkindly utters towards", "atomically wedgies", "prods", "electrocutes", "shouts at"];
        var user1Health = 100;
        var user2Health = 100;
        var Events = [];
        var turn = 1;
        var winner;

        var user1 = "**" + msg.author.username + "**";

        if (!msg.mentions.users.first()) {
            return msg.channel.send("You need to mention someone!");
        } else {
            var user2 = "**" + msg.mentions.users.first().username + "**";
        }

        while (user1Health > 0 && user2Health > 0) {
            function getRandomInt(max) {
                return Math.floor(Math.random() * Math.floor(max));
            };
            attack = attacks[getRandomInt(attacks.length)];
            damage = getRandomInt(30);
            if (turn == 1) {
                user2Health = user2Health - damage;
                if (user2Health < 0) {
                    user2Health = 0;
                }
                Events.push(user1 + " " + attack + " " + user2 + " for " + damage + " damage. (`" + user1Health + "/" + user2Health + "`)")
                turn = 2;
            } else {
                user1Health = user1Health - damage;
                if (user1Health < 0) {
                    user1Health = 0;
                }
                Events.push(user2 + " " + attack + " " + user1 + " for " + damage + " damage. (`" + user1Health + "/" + user2Health + "`)")
                turn = 1;
            }
        }
        if (turn == 1) {
            winner = user2;
        } else {
            winner = user1;
        }

        var list = Events.join("\n");

        const winnerEmbed = new Discord.MessageEmbed()
            .setColor(color)
            .setTitle("👑 Winner 👑")
            .setDescription("The winner is " + winner + "!")
        msg.channel.send(winnerEmbed).then(message => {
            message.react("📋");

            const filter = (reaction, user) => {
                if (user.id !== client.user.id) {
                    return reaction.emoji.name === '📋';
                }
            };

            const collector = message.awaitReactions(filter, { max: 1, time: 30000 })
                .then(collected => {
                    const gameEmbed = new Discord.MessageEmbed()
                        .setColor(color)
                        .setTitle(user1 + " VS " + user2)
                        .setDescription(list);
                    msg.channel.send(gameEmbed);
                })
        })
    },
};