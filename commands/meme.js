const axios = require("axios");
const { color } = require('../data/config.json');
const Discord = require("discord.js");
module.exports = {
    name: 'meme',
    description: 'Create memes automatically! To use, set a template name, then seperate the template name, top and bottom text (optional) with dashes.',
    usage: '/meme [template name] [-top text] [-bottom text]\nEG: /meme confused confusing confusion -what -what in the fuck',
    class: 'Entertaining',
    requiresArgs: true,
    utterances: ["show me a meme", "show me memes", "memes", "imgflip", "imgflip meme", "create a meme"],
    execute(msg, args) {
        //Gather Arguments
        args = args.join(" ");
        args = args.split(/-+/g);
        template = args[0];
        top = args[1];
        bottom = args[2];
        //Post Request
        axios
            .post('https://fyouron-api.herokuapp.com/', {
                template_name: template,
                top_text: top,
                bottom_text: bottom
            })
            .then((res) => {
                imageURL = res.data;
                if (imageURL == "template not found") {
                    return msg.channel.send("Couldn't find that template :(");
                }
                const embed = new Discord.MessageEmbed()
                    .setColor(color)
                    .setTitle("Image URL Here!")
                    .setURL(imageURL)
                    .setImage(imageURL)
                msg.channel.send(embed);
            })
            .catch((error) => {
                msg.channel.send("Something went wrong!")
            })
    },
};