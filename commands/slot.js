const discord = require("discord.js");
const { color } = require("../data/config.json");
module.exports = {
    name: 'slot',
    description: 'Try your luck at a slot machine!',
    usage: '/slot',
    class: 'Random',
    requiresArgs: true,
    async execute(msg, args, client) {
        const reel = ["🍉", "🍇", "🍋", "🍌", "💎", "🍒", "🎰", "🍊"];

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
                            outcome = "You've won!";
                        } else if (reel1 == reel2 || reel2 == reel3 || reel1 == reel3) {
                            outcome = "Better luck next time!";
                        } else {
                            outcome = "You've lost! Better luck next time!"
                        }
                        updated = new discord.MessageEmbed()
                            .setColor(color)
                            .setTitle("The reels have stopped!")
                            .setDescription(reel[reel1] + " " + reel[reel2] + " " + reel[reel3])
                            .addField(outcome, "Bet amount: " + bet)
                        sentMessage.edit(updated);
                    }
                }, 1100);
            };
            spinReels();
        })
    },
};