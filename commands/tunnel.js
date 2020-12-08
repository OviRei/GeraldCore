const { botName } = require('../data/config.json');
module.exports = {
    name: 'tunnel',
    description: 'Dig/Fill Channel tunnels! Tunnel allows you to create a path between two servers via Gerald. To dig a tunnel, use the dig command followed by the ID number of the channel you wish to tunnel to. The specified channel will be sent a verification message to accept your tunnel. To fill a tunnel, simply enter the fill command followed by the channel ID you wish to fill.',
    usage: '/tunnel dig [channel ID] \n/tunnel fill [channel ID]',
    class: 'Useful',
    requiresArgs: true,
    execute(msg, args, client) {
        var perms = msg.member.permissionsIn(msg.channel).toArray();
        if (!perms.includes("MANAGE_CHANNELS")) {
            return msg.channel.send("You need to have `MANAGE_CHANNELS` to use this command! ⛏❌");
        }
        var errormsg;
        if (args[0] === "dig") {
            if (!args[1]) {
                return msg.channel.send("You must provide a channel ID ⛏🆔");
            }
            var mongo = require('mongodb-wrapper');
            var db = mongo.db('localhost', 27017, botName);
            db.collection('tunnels');
            db.tunnels.find({ ping: args[1] }).toArray(function(err, posts) {
                if (!posts[0]) {
                    try {
                        msg.channel.send("Awaiting tunnel acceptance... ⛏❗");
                        client.channels.cache.get(args[1]).send("Incoming tunnel from " + msg.channel.id + "! ⛏❗")
                    } catch (error) {
                        errormsg = error;
                    }
                    if (errormsg) {
                        return msg.channel.send("This tunnel cannot be dug ⛏❌");
                    } else {
                        const filter = m => m.content === "accept";
                        const channel = client.channels.cache.get(args[1]);
                        channel.send("Type 'accept' within 15 seconds to allow this tunnel ⛏❗")
                        const collector = channel.createMessageCollector(filter, { max: 1, time: 15000, errors: ['time'] });
                        collector.on('collect', collected => {
                            db.tunnels.insert({ "ping": msg.channel.id, "pong": args[1] });
                            db.tunnels.insert({ "ping": args[1], "pong": msg.channel.id });
                            msg.channel.send("Tunnel dug ⛏✅");
                            channel.send("Tunnel dug ⛏✅");
                        });
                        collector.on('end', collected => {
                            var i;
                            collected.map(c => i++)
                            if (collected.size < 1) {
                                msg.channel.send("The tunnel was denied  ⛏❌");
                            }
                        });
                    }
                } else {
                    msg.channel.send("There is already a tunnel associated with this ID ⛏✅");
                }
            });
        } else if (args[0] === "fill") {
            var mongo = require('mongodb-wrapper');
            var db = mongo.db('localhost', 27017, botName);
            db.collection('tunnels');
            db.tunnels.find({ ping: msg.channel.id }).toArray(function(err, posts) {
                if (!posts[0]) {
                    msg.channel.send("There is no tunnel associated with this channel ⛏❌")
                } else {
                    opposite = posts[0].pong;
                    db.tunnels.remove({ ping: msg.channel.id });
                    db.tunnels.remove({ ping: opposite });
                    msg.channel.send("Tunnel filled ⛏⛔");
                    client.channels.cache.get(opposite).send("The tunnel to " + msg.channel.id + " has been filled ⛏⛔");
                }
            });
        } else {
            msg.channel.send("You need to use **dig/fill [channel ID]** ⛏");
        }
    },
};