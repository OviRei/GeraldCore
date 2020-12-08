const discord = require("discord.js");
const { color } = require("../data/config.json");
module.exports = {
    name: 'spin',
    description: 'Spin aspinner, see how long it lasts!\nColors: Red, Orange, Yellow, Green, Blue, Indigo, Pink, Violet, Purple, White, Black, Brown, Grey',
    usage: '/spin [colour] \nLeave blank for a random colour!',
    class: 'Random',
    requiresArgs: false,
    execute(msg, args, client) {
        //Set Spinner Objects
        spinners = {
                "colors": ["red", "orange", "yellow", "green", "blue", "indigo", "violet", "pink", "black", "brown", "grey", "purple", "white", "black"],
                "hex": ["#FF0000", "#FF7433", "#FFF633", "#99FF33", "#33E0FF", "#4C33FF", "#C733FF", "#FF97DB", "#000000", "#5A2525", "#ABABAB", "#A000D4", "#F5F5F5", "#000000", "#3B210F", "#9E9E9E"]
            }
            //RandomInt to get spin time
        function getRandomInt(max) {
            return Math.floor(Math.random() * Math.floor(max));
        };
        //Sends initial message
        function sendEmbed(hex, color) {
            time = getRandomInt(40);
            time = time + 1;
            const startEmbed = new discord.MessageEmbed()
                .setColor(hex)
                .setTitle(msg.author.username + "'s spinner is spinning...")
                .setDescription("You spin a " + color + " spinner...")
            msg.channel.send(startEmbed).then((sentMessage) => {
                time = time * 1000;
                //Updates message
                function update() {
                    const newEmbed = new discord.MessageEmbed()
                        .setTitle(msg.author.username + "'s spinner has stopped!")
                        .setColor(hex)
                        .setDescription("It spun for **" + time / 1000 + "** seconds!")
                    sentMessage.edit(newEmbed);
                }
                setTimeout(update, time);
            });
        };
        //Get args for color
        if (!args[0]) {
            item = getRandomInt(spinners.hex.length);
            sendEmbed(spinners.hex[item], spinners.colors[item]);
        } else {
            if (spinners.colors.includes(args[0])) {
                sendEmbed(spinners.hex[spinners.colors.indexOf(args[0])], args[0]);
            } else {
                msg.channel.send("That's not a valid spinner color!");
            }
        }
    },
};