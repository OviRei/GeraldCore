const discord = require("discord.js");
const { color } = require("../data/config.json");
module.exports = {
    name: 'process',
    description: 'Lists process information',
    usage: '/process',
    class: 'Admin',
    requiresArgs: false,
    utterances: [],
    execute(msg, args, client) {
        function secondsToDhms(seconds) {
            seconds = Number(seconds);
            var d = Math.floor(seconds / (3600 * 24));
            var h = Math.floor(seconds % (3600 * 24) / 3600);
            var m = Math.floor(seconds % 3600 / 60);
            var s = Math.floor(seconds % 60);

            var dDisplay = d > 0 ? d + (d == 1 ? " day, " : " days, ") : "";
            var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
            var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
            var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
            return dDisplay + hDisplay + mDisplay + sDisplay;
        }
        uptime = secondsToDhms(Math.floor(process.uptime()));
        memUsage = JSON.stringify(process.memoryUsage(), undefined, 2);
        architecture = process.arch;
        pid = process.pid;
        platform = process.platform;
        version = process.version;
        const embed = new discord.MessageEmbed()
            .setColor(color)
            .addField("Information: ", "```Uptime: " + uptime + "\nCPU Architecture: " + architecture + "\nPlatform: " + platform + "\nNode.JS Version: " + version + "\n```\n```js\nMemory Usage\n" + memUsage + "\n```")
        msg.channel.send(embed);
    },
};