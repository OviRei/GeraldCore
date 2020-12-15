const discord = require("discord.js");
const { color, version } = require("../data/config.json");
module.exports = {
    name: 'info',
    description: 'Gives you information about Gerald',
    usage: '/info',
    class: 'Useful',
    requiresArgs: false,
    utterances: ["botinfo", "bot information", "information", "tell me about this bot", "bot"],
    execute(msg, args, client) {
        const { commands, services } = client;
        var memberCount = client.guilds.cache.reduce((a, g) => a + g.memberCount, 0);
        var guilds = 0;
        client.guilds.cache.forEach(guild => {
            guilds++;
        })
        var commandTotal = commands.map(command => command.name)
        var serviceTotal = services.map(command => command.name)
        const infoEmbed = new discord.MessageEmbed()
            .setColor(color)
            .setURL("https://github.com/Elementalmp4/GeraldCore")
            .setThumbnail(client.user.avatarURL())
            .setTitle("GeraldCore V" + version)
            .setDescription("GeraldCore - We definitely know what we are doing")
            .addField("Gerald Hall Of Fame: ", '`ElementalMP4#7458:` Gerald Owner ([GitHub](https://github.com/Elementalmp4))\n`A Better Name Than That#6414:` GeraldAI Developer, Software Maintainer([GitHub](https://github.com/FirstPotatoMan))\n`0xffset#6605:` Service Executor, MathEngine Developer ([GitHub](https://github.com/0xffset))\n`captain_cuckoo#4446`: Meme API ([GitHub](https://github.com/captain-cuckoo))')
            .setFooter(commandTotal.length + " Commands & " + serviceTotal.length + " Services\n" + memberCount + " members in " + guilds + " guilds")
            .setTimestamp()
        msg.channel.send(infoEmbed)
    },
};