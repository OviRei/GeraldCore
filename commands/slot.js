const discord = require("discord.js");
const { color, botName } = require("../data/config.json");
var mongo = require('mongodb-wrapper');
var balanceDB = mongo.db('localhost', 27017, botName);
balanceDB.collection('balances');
module.exports = {
    name: 'slot',
    description: 'Try your luck at a slot machine! If two symbols are the same, your bet is returned. If all 3 symbols are the same you get your bet back, plus 2 times your original bet. If none of the symbols are the same, you lose.',
    usage: '/slot [bet amount]',
    class: 'Currency',
    requiresArgs: true,
    async execute(msg, args, client) {
        const reel = ["🍉", "🍇", "🍋", "🍌", "💎", "🍒", "🎰", "🍊"];
        var bet = args[0];
        var balance;

        balanceDB.balances.find({ ID: msg.author.id }).toArray(function(err, posts) {
            if (!posts.length) {
                return msg.channel.send("You don't have any money! Use `hourly` to get started! 💵");
            }
            if (posts[0].CASH < bet) {
                return msg.channel.send("You don't have enough money to make that bet! 💵");
            }

            balance = posts[0].CASH;
        });

        function getRandomInt(max) {
            return Math.floor(Math.random() * Math.floor(max));
        };

        var reel1 = getRandomInt(reel.length);
        var reel2 = getRandomInt(reel.length);
        var reel3 = getRandomInt(reel.length);
        var rotations = getRandomInt(10) + 5;

        var i = 1;

        const original = new discord.MessageEmbed()
            .setColor(color)
            .setTitle("The reels are turning...")
            .setDescription(reel[reel1] + " " + reel[reel2] + " " + reel[reel3])
        msg.channel.send(original).then(sentMessage => {
            function spinReels() {
                setTimeout(function() {
                    reel1 = getRandomInt(reel.length);
                    reel2 = getRandomInt(reel.length);
                    reel3 = getRandomInt(reel.length);

                    updated = new discord.MessageEmbed()
                        .setColor(color)
                        .setTitle("The reels are turning...")
                        .setDescription(reel[reel1] + " " + reel[reel2] + " " + reel[reel3])
                    sentMessage.edit(updated);
                    i++;
                    if (i < rotations) {
                        spinReels();
                    } else {
                        if (reel1 == reel2 && reel2 == reel3) {
                            outcome = "You've won + " + bet * 2 + "💵!";
                            balance = balance + (bet * 2);
                        } else if (reel1 == reel2 || reel2 == reel3 || reel1 == reel3) {
                            outcome = "Better luck next time!";
                        } else {
                            outcome = "You've lost! Better luck next time!"
                            balance = balance - bet;
                        }
                        updated = new discord.MessageEmbed()
                            .setColor(color)
                            .setTitle("The reels have stopped!")
                            .setDescription(reel[reel1] + " " + reel[reel2] + " " + reel[reel3])
                            .addField(outcome, "Bet amount: " + bet)
                        sentMessage.edit(updated);
                        balanceDB.balances.update({ ID: msg.author.id }, { $set: { CASH: balance } });
                    }
                }, 1100);
            };
            spinReels();
        })
    },
};