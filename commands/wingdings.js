const Discord = require("discord.js");
module.exports = {
    name: 'wingdings',
    description: 'Convert text to wingdings',
    usage: '/wingdings [text]',
    class: 'Entertaining',
    requiresArgs: true,
    execute(msg, args, client) {
        var message = "";
        var wingdings = [
            ":v:",
            ":ok_hand:",
            ":thumbsup:",
            ":thumbsdown:",
            ":point_left:",
            ":point_right:",
            ":point_up:",
            ":point_down:",
            ":raised_hand:",
            ":relaxed:",
            ":neutral_face:",
            ":frowning2:",
            ":bomb:",
            ":skull_crossbones:",
            "⚐",
            ":white_medium_square:",
            ":airplane:",
            "☼",
            ":droplet:",
            ":snowflake:",
            "🕆",
            "✟",
            ":diamonds:",
            "✠",
            ":star_of_david:",
            ":star_and_crescent:"
        ];
        var english = ["a",
            "b",
            "c",
            "d",
            "e",
            "f",
            "g",
            "h",
            "i",
            "j",
            "k",
            "l",
            "m",
            "n",
            "o",
            "p",
            "q",
            "r",
            "s",
            "t",
            "u",
            "v",
            "w",
            "x",
            "y",
            "z"
        ];
        if (!args[0]) {
            return msg.channel.send("You must supply some text");
        }
        str = args.join(" ").toLowerCase();
        str = str.split("");
        for (i = 0; i < str.length; i++) {
            if (english.includes(str[i])) {
                message = message + wingdings[english.indexOf(str[i])];
            } else {
                message = message + str[i];
            }
        }
        msg.channel.send(message);
    },
};