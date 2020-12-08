const fs = require("fs");
module.exports = {
    name: 'dad',
    description: "Enables/Disables the classic I'm Dad! joke in this guild",
    usage: '/dad [enable/disable]',
    class: 'Entertaining',
    requiresArgs: true,
    utterances: ["im dad", "dad jokes", "dad joke", "dad", "i'm dad"],
    execute(msg, args, client) {
        if (msg.channel.type === "dm") {
            return msg.channel.send("This feature is only available in servers.")
        }
        const command = args[0];
        if (command === "enable") {
            delete require.cache[require.resolve('../data/dadGuilds.json')];
            var { dadGuilds } = require("../data/dadGuilds.json");
            if (dadGuilds.includes(msg.guild.id)) {
                msg.channel.send("Dad is already enabled in this guild");
            } else {
                dadGuilds.push(msg.guild.id);
                var data = { "dadGuilds": dadGuilds };
                fs.writeFile("./data/dadGuilds.json", JSON.stringify(data), (err) => {
                    if (err) {
                        console.error(err);
                        return;
                    };
                });
                msg.channel.send("Dad has been enabled in this guild");
            }
        } else if (command === "disable") {
            delete require.cache[require.resolve('../data/dadGuilds.json')];
            var { dadGuilds } = require("../data/dadGuilds.json");
            if (!dadGuilds.includes(msg.guild.id)) {
                msg.channel.send("Dad is already disabled in this guild");
            } else {
                function containsChannel(channel) {
                    return channel != msg.guild.id;
                }
                dadGuilds = dadGuilds.filter(containsChannel);
                var data = { "dadGuilds": dadGuilds };
                fs.writeFile("./data/dadGuilds.json", JSON.stringify(data), (err) => {
                    if (err) {
                        console.error(err);
                        return;
                    };
                });
                msg.channel.send("Dad has been disabled in this guild");
            }
        } else {
            msg.channel.send("You must use a subcommand: **enable/disable**");
        }
    },
};