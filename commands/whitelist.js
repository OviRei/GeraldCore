const { botName, owner } = require('../data/config.json');
var mongo = require('mongodb-wrapper');
var db = mongo.db('localhost', 27017, botName);
db.collection('commands');
var channels = [];
var newWhitelist;
module.exports = {
    name: 'whitelist',
    description: 'Set a whitelist. You can enter a list of channel ID numbers with a space seperating them, or enter clear to remove the whitelist',
    usage: 'whitelist [channel ID] [channel ID] [...]\nwhitelist clear',
    class: 'Configuration',
    requiresArgs: true,
    execute(msg, args, client) {
        //Get perms
        var perms = msg.member.permissionsIn(msg.channel).toArray();
        if (!perms.includes("MANAGE_GUILD") && msg.author.id !== owner) {
            return msg.channel.send("You need to have `MANAGE_GUILD` to use this command!");
        }
        //Get arguments
        if (args[0] == "clear") {
            newWhitelist = [];
            newWhitelist.push("null");
        } else {
            newWhitelist = args;
        }
        //Update/set command enabler
        db.commands.find({ ID: msg.guild.id }).toArray(function(err, posts) {
            if (!posts.length) {
                console.log("No posts");
                db.commands.insert({ "ID": msg.guild.id, "WHITELIST": newWhitelist });
            } else {
                console.log("Updated");
                db.commands.update({ ID: msg.guild.id }, { $set: { WHITELIST: newWhitelist } });
            }
        });
        if (newWhitelist[0] !== "null") {
            newWhitelist.forEach(element => {
                channels.push(client.channels.cache.get(element).name)
            });
            msg.channel.send("**Updated command config**\nEnabled channels:\n```\n" + channels.join("\n") + "```");
        } else {
            msg.channel.send("**Updated command config**\nCommands are enabled in every channel");
        }

    },
};