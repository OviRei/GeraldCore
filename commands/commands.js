const { botName, owner } = require('../data/config.json');
var mongo = require('mongodb-wrapper');
var db = mongo.db('localhost', 27017, botName);
db.collection('commands');
var disabled;
module.exports = {
    name: 'commands',
    description: 'Enable/Disable a command in a guild',
    usage: '/commands [command name] [enable/disable]',
    class: 'Configuration',
    requiresArgs: true,
    async execute(msg, args, client) {
        //Get perms
        var perms = msg.member.permissionsIn(msg.channel).toArray();
        if (!perms.includes("MANAGE_GUILD") && msg.author.id !== owner) {
            return msg.channel.send("You need to have `MANAGE_GUILD` to use this command!");
        }
        //Get arguments
        if (!args[0] || !args[1]) {
            return msg.channel.send("You need to specify a command and whether you want to enable/disable")
        }
        //Get command
        command = client.commands.get(args[0].toLowerCase());
        if (!command) {
            return msg.channel.send("That isn't a valid command!");
        }
        //Set enabled/disabled
        if (args[1] === "enable") {
            enabled = true;
        } else if (args[1] === "disable") {
            enabled = false;
        } else {
            return msg.channel.send("Invalid setup option");
        }

        if (args[0] === "commands") {
            return msg.channel.send("You cannot disable this command!");
        }

        console.log(enabled);
        //Update/set command enabler
        await db.commands.find({ ID: msg.guild.id }).toArray(function(err, posts) {
            if (!posts.length) {
                console.log("No posts");
                if (!enabled) {
                    db.commands.insert({ "ID": msg.guild.id, "DISABLED": [command.name] });
                    msg.channel.send("**Updated command config**\nDisabled Commands:\n```\n" + disabled.join("\n") + "```");
                }
            } else {
                console.log("Updated");
                disabled = posts[0].DISABLED;
                if (disabled.includes(command.name)) {
                    if (enabled) {
                        index = disabled.indexOf(command.name);
                        disabled.splice(index, 1);
                    }
                } else {
                    if (!enabled) {
                        disabled.push(command.name);
                    }
                }
                db.commands.update({ ID: msg.guild.id }, { $set: { DISABLED: disabled } });
                msg.channel.send("**Updated command config**\nDisabled Commands:\n```\n" + disabled.join("\n") + "```");
            }
        });
    },
};