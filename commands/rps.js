const Discord = require("discord.js");
const { color } = require('../data/config.json');
module.exports = {
    name: 'rps',
    description: 'Play Rock Paper Scissors',
    usage: '/rps [r/p/s]',
    class: 'Entertaining',
    requiresArgs: true,
    utterances: ["rock paper scissors"],
    execute(msg, args) {
        var user = args[0];
        var outcome;
        var computerChoice;
        var userChoice;
        if (user != "r" && user != "p" && user != "s") {
            const rpsHelpEmbed = new Discord.MessageEmbed()
                .setColor(color)
                .setTitle('Rock Paper Scissors')
                .setDescription("Usage: /rps [r/p/s]")
            msg.channel.send(rpsHelpEmbed);
        } else {
            var computer = Math.floor(Math.random() * Math.floor(3));
            if (computer == 0 && user === "s") {
                outcome = "I win!";
            } else if (computer == 1 && user === "r") {
                outcome = "I win!";
            } else if (computer == 2 && user === "p") {
                outcome = "I win!";
            } else {
                outcome = "You win!";
            }
            switch (computer) {
                case 0:
                    computerChoice = "Rock";
                    break;
                case 1:
                    computerChoice = "Paper";
                    break;
                case 2:
                    computerChoice = "Scissors";
                    break;
            }
            switch (user) {
                case 'r':
                    userChoice = "Rock";
                    break;
                case 'p':
                    userChoice = "Paper";
                    break;
                case 's':
                    userChoice = "Scissors";
                    break;
            }
            const rpsResultEmbed = new Discord.MessageEmbed()
                .setColor(color)
                .setTitle(outcome)
                .setDescription("You played: " + userChoice + "\n I played: " + computerChoice)
            msg.channel.send(rpsResultEmbed);
        }

    },
};