const red = [1, 3, 3, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];
const black = [2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 35];
const { botName, color } = require("../data/config.json");
var mongo = require('mongodb-wrapper');
var balanceDB = mongo.db('localhost', 27017, botName);
balanceDB.collection('balances');
const discord = require("discord.js");
module.exports = {
    name: 'roulette',
    description: 'Like roulette but not, In this version, you bet on a colour (red/black) and a number (1-36). If you get the colour/number then you win back what you bet and no more. If you get the colour and the number you win back twice what you bet. If you get neither then you lose your bet.',
    usage: '/roulette [red/black] [1-36] [bet amount]\n/roulette list (to see what colours and numbers you can use)',
    class: 'Currency',
    requiresArgs: true,
    utterances: ["play roulette", "bet on roulette", "place a bet", "roulette wheel"],
    execute(msg, args, client) {
        var colour = args[0];
        var number = parseInt(args[1]);
        var bet = parseInt(args[2]);

        if (!number || !bet) {
            return msg.channel.send("Something went wrong! See the command usage for more info! `help roulette`");
        }

        //Input Checks
        if (colour === "list") {
            const helpEmbed = new discord.MessageEmbed()
                .setColor(color)
                .addField("Red", red.join(" - "))
                .addField("Black", black.join(" - "))
                .setTitle("Roulette Numbers/Colours")
            return msg.channel.send(helpEmbed);
        }

        balanceDB.balances.find({ ID: msg.author.id }).toArray(function(err, posts) {
            if (!posts.length) {
                return msg.channel.send("You don't have any money! Use `hourly` to get started! 💵");
            }
            if (posts[0].CASH < bet) {
                return msg.channel.send("You don't have enough money to make that bet! 💵");
            }

            var balance = posts[0].CASH;

            if (colour !== "red" && colour !== "black") {
                return msg.channel.send("You need to choose either :red_circle:`red` or :black_circle:`black`!");
            }
            if (!red.includes(number) && !black.includes(number)) {
                return msg.channel.send("You need to choose a valid number! 🔢");
            }
            if (red.includes(number) && colour === "black") {
                return msg.channel.send("You can only use that number with :red_circle: red!");
            }
            if (black.includes(number) && colour === "red") {
                return msg.channel.send("You can only use that number with :black_circle: black!");
            }

            function getRandomInt(max) {
                return Math.floor(Math.random() * Math.floor(max));
            };

            const rouletteEmbed = new discord.MessageEmbed()
                .setColor(color)
                .setTitle("The wheel is spinning...")
                .setDescription("The roulette wheel is spinning...")
                .addField("Your Bet", colour + " " + number + " For " + bet + "💵")
            msg.channel.send(rouletteEmbed).then((sentMessage) => {
                setTimeout(function() {
                    let constColours = ["red", "black"];
                    var num = getRandomInt(2);
                    CPUcolour = constColours[num];

                    var wrongNumber = true;

                    while (wrongNumber) {
                        chosenNumber = getRandomInt(36) + 1;
                        if (CPUcolour === "red" && red.includes(chosenNumber)) {
                            wrongNumber = false;
                        }
                        if (CPUcolour === "black" && black.includes(chosenNumber)) {
                            wrongNumber = false;
                        }
                    }

                    if (CPUcolour === colour && chosenNumber === number) {
                        updatedEmbed = new discord.MessageEmbed()
                            .setColor(color)
                            .setTitle("The wheel has stopped!")
                            .setDescription("You won! The ball landed on " + CPUcolour + " " + chosenNumber)
                            .addField("Your Bet", colour + " " + number + " For " + bet + "💵")
                            .addField("Landed on", CPUcolour + " " + chosenNumber)
                        sentMessage.edit(updatedEmbed)
                        balance = balance + bet;
                    } else if (CPUcolour === colour) {
                        updatedEmbed = new discord.MessageEmbed()
                            .setColor(color)
                            .setTitle("The wheel has stopped!")
                            .setDescription("Your colour was right, but the ball landed on " + CPUcolour + " " + chosenNumber + ". Better luck next time!")
                            .addField("Your Bet", colour + " " + number + " For " + bet + "💵")
                            .addField("Landed on", CPUcolour + " " + chosenNumber)
                        sentMessage.edit(updatedEmbed)
                    } else {
                        updatedEmbed = new discord.MessageEmbed()
                            .setColor(color)
                            .setTitle("The wheel has stopped!")
                            .setDescription("The ball landed on " + CPUcolour + " " + chosenNumber + ". Unlucky!")
                            .addField("Your Bet", colour + " " + number + " For " + bet + "💵")
                            .addField("Landed on", CPUcolour + " " + chosenNumber)
                        sentMessage.edit(updatedEmbed)
                        balance = balance - bet;
                    }
                    balanceDB.balances.update({ ID: msg.author.id }, { $set: { CASH: balance } });
                }, 1000);
            })
        })
    },
};