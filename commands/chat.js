const fs = require("fs");
const cleverbot = require("cleverbot-free");
module.exports = {
    name: 'chat',
    description: 'Enables/Disables GeraldAI conversation mode (Powered by Cleverbot)',
    usage: '/chat [enable/disable]',
    class: 'Entertaining',
    requiresArgs: true,
    utterances: ["talk", "talk to me", "cleverbot", "talk to cleverbot", "im lonely", "i want to talk", "can you talk", "say something"],
    execute(msg, args, client) {
        if (msg.channel.type === "dm") {
            return msg.channel.send("This feature is only available in servers. To talk to GeraldAI, simply send a message here")
        }
        var perms = msg.member.permissionsIn(msg.channel).toArray();
        if (!perms.includes("MANAGE_CHANNELS")) {
            return msg.channel.send("You need to have `MANAGE_CHANNELS` to use this command! 🤖❌");
        }
        const command = args[0];
        if (command === "enable") {
            delete require.cache[require.resolve('../data/aichannels.json')];
            var { channels } = require("../data/aichannels.json");
            if (channels.includes(msg.channel.id)) {
                msg.channel.send("GeraldAI is already enabled in this channel 🤖✅");
            } else {
                channels.push(msg.channel.id);
                var data = { "channels": channels };
                fs.writeFile("./data/aichannels.json", JSON.stringify(data), (err) => {
                    if (err) {
                        console.error(err);
                        return;
                    };
                });
                msg.channel.send("GeraldAI has been enabled in this channel🤖✅");
            }
        } else if (command === "disable") {
            delete require.cache[require.resolve('../data/aichannels.json')];
            var { channels } = require("../data/aichannels.json");
            if (!channels.includes(msg.channel.id)) {
                msg.channel.send("GeraldAI is already disabled in this channel 🤖⛔");
            } else {
                function containsChannel(channel) {
                    return channel != msg.channel.id;
                }
                channels = channels.filter(containsChannel);
                var data = { "channels": channels };
                fs.writeFile("./data/aichannels.json", JSON.stringify(data), (err) => {
                    if (err) {
                        console.error(err);
                        return;
                    };
                });
                msg.channel.send("GeraldAI has been disabled in this channel 🤖⛔");
            }
        } else {
            msg.channel.send("You must use a subcommand: **enable/disable** 🤖❌");
        }
    },
};