function msToTime(duration) {
    var seconds = Math.floor((duration / 1000) % 60),
        minutes = Math.floor((duration / (1000 * 60)) % 60),
        hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    return hours + ":" + minutes + ":" + seconds;
}
const discord = require("discord.js");
const { color, botName } = require("../data/config.json");
module.exports = {
    name: 'stats',
    description: 'Shows vital bot statistics',
    usage: 'stats',
    class: 'Admin',
    requiresArgs: false,
    execute(msg, args, client) {
        var stats = require("../data/stats.json");
        var d = new Date();
        var timeNow = d.getTime();
        var uptime = timeNow - stats.startTime;
        uptime = msToTime(uptime);
        const chrono = uptime;
        const milliseconds = stats.startTime * 1000;
        const dateObject = new Date(milliseconds);
        const startDate = dateObject.toLocaleString();
        comTotal = stats.commandCount;
        passedCom = stats.passedCommands;
        failedCom = stats.failedCommands;
        const embed = new discord.MessageEmbed()
            .setColor(color)
            .setTitle(botName + " Statistics")
            .addField("Bot Uptime", "```" + uptime + "```")
            .addField("Bot Start Date", "```" + startDate + "```")
            .addField("Total Executed Commands", "```" + comTotal + "```")
            .addField("Passed Executions", "```" + passedCom + "```")
            .addField("Failed Executions", "```" + failedCom + "```")
        msg.channel.send(embed);
    },
};