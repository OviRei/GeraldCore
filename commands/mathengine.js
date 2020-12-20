const MathEngine = require("../build/Release/MathEngine.node");
const discord = require("discord.js");
const { color } = require("../data/config.json");
module.exports = {
    name: 'mathengine',
    description: 'Calculate mathematical equations using a custom math engine. Options: \n\n+ add\n\n- subtract\n\n/ divide\n\n* multiply\n\n^ power\n\n( ) parenthesis\n\nsin(param) sin of param (default is 0)\n\ncos(param) cos of param (default is 0)\n\ntan(param) tan of param (default is 0)\n\nsqrt(param) square root of param (default is 0)\n\n!(param) factorial of param\n\npi pi(3,14...)\n\ne e(2,71...)',
    usage: '/mathengine [calculation]',
    class: 'Useful',
    requiresArgs: true,
    utterances: [],
    async execute(msg, args, client) {
        var input = args.join("");
        console.log(args);
        console.log(input);
        var result = MathEngine.runEngine(input);
        if (result.err) {
            const errorEmbed = new discord.MessageEmbed()
                .setColor(color)
                .setTitle("MathEngine Error:")
                .setDescription("```\n" + result.err + "\n```")
                .setTimestamp()
                .setFooter("An error occured ", client.user.avatarURL())
            msg.channel.send(errorEmbed);
        } else {
            const resEmbed = new discord.MessageEmbed()
                .setColor(color)
                .setTitle("MathEngine Result:")
                .setDescription("```\nRaw Input:\n" + result.rawInput + "\n\nRPN:\n" + result.rpn + "\n\nOutput:\n" + result.output + "```")
                .setFooter("Infix to RPN: " + result.infixToRPN + "µs\nRPN to binary tree: " + result.RPNtoBinaryTree + "µs\nCalculation Time: " + result.calcTime + "µs", client.user.avatarURL())
            msg.channel.send(resEmbed);
        }
    },
};