const https = require('https');
const discord = require("discord.js");
const { color } = require("../data/config.json");
module.exports = {
    name: 'rover',
    description: 'Get a random image from one of the Mars rovers, leave blank for a random rover, or enter a rover name',
    usage: '/rover [Curiosity/Opportunity/Spirit]',
    class: 'Random',
    requiresArgs: false,
    utterances: ["nasa", "mars rover", "mars rover images", "mars images", "nasa rover", "curiosity", "opportunity", "spirit"],
    execute(msg, args, client) {
        let rovers = ["curiosity", "opportunity", "spirit"];
        var roverName = "";
        if (!args[0]) {
            function getRandomInt(max) {
                return Math.floor(Math.random() * Math.floor(max));
            };
            roverName = getRandomInt(2);
            roverName = rovers[roverName];
        } else {
            if (!rovers.includes(args[0].toLowerCase())) {
                return msg.channel.send("Invalid rover name");
            } else {
                roverName = args[0].toLowerCase();
            }
        }
        https.get("https://api.nasa.gov/mars-photos/api/v1/rovers/" + roverName + "/photos?sol=1000&api_key=lCJQbMiUG6iZMQdas8Qcg2IQ8KQmC19Ssuhc84pi", (res) => {
            let data = '';
            res.on('data', (chunk) => {
                data += chunk;
            });
            res.on('end', () => {
                res = JSON.parse(data);
                res = res.photos;
                count = res.length;

                function getRandomInt(max) {
                    return Math.floor(Math.random() * Math.floor(max));
                };
                item = getRandomInt(count);
                res = res[item];
                console.log(res);
                const roverEmbed = new discord.MessageEmbed()
                    .setColor(color)
                    .setTitle(res.rover.name)
                    .setImage(res.img_src)
                    .addField("Camera: ", res.camera.name, true)
                    .addField("Rover: ", res.rover.name, true)
                    .addField("Status: ", res.rover.status, true)
                    .addField("Image Date: ", res.earth_date, true)
                    .setFooter("Data from NASA", "https://cdn.freebiesupply.com/logos/large/2x/nasa-1-logo-png-transparent.png")
                msg.channel.send(roverEmbed);
            });
        }).on("error", (err) => {
            console.log("Error: " + err.message);
        });
    },
};