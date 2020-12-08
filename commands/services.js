const Discord = require("discord.js");
const { color, admins } = require("../data/config.json");
module.exports = {
    name: 'services',
    description: 'View active and disabled services. Admin only',
    usage: '/services',
    class: 'Admin',
    requiresArgs: false,
    execute(msg, args, client) {
        if (!admins.includes(msg.author.id)) {
            msg.channel.send("You cannot use this command!");
        } else {
            const { services } = client;
            var serviceTotal = services.map(command => command.name);
            var enabledservices = services.map(command => { if (command.enabled) { return '✅`' + command.name + '`' } else { return '⛔`' + command.name + '`' } });
            const serviceEmbed = new Discord.MessageEmbed()
                .setColor(color)
                .setTitle("Service Monitor")
                .addField("Services: ", enabledservices.join("\n"), true)
                .setFooter("Service count: " + serviceTotal.length)
            msg.channel.send(serviceEmbed);
        }
    },
};