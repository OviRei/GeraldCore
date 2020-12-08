const https = require('https');
const discord = require("discord.js");
const { color } = require("../data/config.json");
module.exports = {
    name: 'neo',
    description: 'Get all Near Earth Objects from today',
    usage: '/neo',
    class: 'Random',
    requiresArgs: false,
    utterances: ["nasa", "near earth", "asteroids", "meteors", "asteroid", "earth orbit", "orbiting objects"],
    execute(msg, args, client) {
        var d = new Date();
        var datestamp = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
        var url = "https://api.nasa.gov/neo/rest/v1/feed?start_date=" + datestamp + "&end_date=" + datestamp + "&api_key=lCJQbMiUG6iZMQdas8Qcg2IQ8KQmC19Ssuhc84pi";
        var desc = "";

        https.get(url, (res) => {
            let data = '';
            res.on('data', (chunk) => {
                data += chunk;
            });
            res.on('end', () => {
                res = JSON.parse(data);
                const objects = res.near_earth_objects[Object.keys(res.near_earth_objects)[0]];
                objects.forEach(element => {
                    desc = desc + "**Name**: `" + element.name + "`\n**Hazardous?** : `" + element.is_potentially_hazardous_asteroid + "`\n**NASA JPL page**: [Link](" + element.nasa_jpl_url + ")\n\n"
                });
                const objectEmbed = new discord.MessageEmbed()
                    .setColor(color)
                    .setDescription(desc)
                    .setTitle("Near Earth Object Report - " + datestamp)
                    .setFooter("Data from NASA", "https://cdn.freebiesupply.com/logos/large/2x/nasa-1-logo-png-transparent.png")
                msg.channel.send(objectEmbed);
            });
        }).on("error", (err) => {
            console.log("Error: " + err.message);
        });
    },
};