const { botName, defaultPrefix, owner } = require('../data/config.json');
var mongo = require('mongodb-wrapper');
var db = mongo.db('localhost', 27017, botName);
db.collection('commands');
module.exports = {
    name: 'prefix',
    description: 'Set the command prefix for this guild. The prefix cannot have a space between it and a command word.',
    usage: '/prefix [new prefix/default]',
    class: 'Configuration',
    requiresArgs: true,
    async execute(msg, args, client, prefix) {
        //Get perms
        var perms = msg.member.permissionsIn(msg.channel).toArray();
        if (!perms.includes("MANAGE_GUILD") && msg.author.id !== owner) {
            return msg.channel.send("You need to have `MANAGE_GUILD` to use this command!");
        }
        //Set Prefix
        if (args[0] === "default") {
            finalPrefix = defaultPrefix;
        } else {
            finalPrefix = msg.content.substr(prefix.length + 7, msg.content.length);
        }

        await db.commands.find({ ID: msg.guild.id }).toArray(function(err, posts) {
            if (!posts.length) {
                db.commands.insert({ "ID": msg.guild.id, "PREFIX": finalPrefix });
            } else {
                db.commands.update({ ID: msg.guild.id }, { $set: { PREFIX: finalPrefix } });
            }
        });
        msg.channel.send("**Updated prefix:** " + finalPrefix);
    },
};