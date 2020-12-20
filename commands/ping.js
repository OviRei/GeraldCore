const discord = require("discord.js");
const { color, botName } = require('../data/config.json');
var mongo = require('mongodb-wrapper');
var db = mongo.db('localhost', '27017', botName);
db.collection('ping');
module.exports = {
    name: 'ping',
    description: 'get the API/Client response time and mongoDB response time',
    usage: 'ping',
    class: 'Useful',
    requiresArgs: false,
    utterances: ["ping time", "respone time", "latency", "speed", "speedtest"],
    async execute(msg, args, client) {
        var d = new Date
        start = d.getTime();
        var commandResponse = Date.now() - msg.createdTimestamp + " ms";
        db.ping.find().toArray(function(err, posts) {
            var d = new Date
            end = d.getTime();
            mdb = end - start;
            ping = Math.round(client.ws.ping);
            original = new discord.MessageEmbed()
                .setTitle(botName + " Ping")
                .addField("Gateway Ping", ping + "ms")
                .addField("MongoDB Ping", mdb + "ms")
                .addField("Command Response time", commandResponse)
                .setColor(color)
            var d = new Date
            start = d.getTime();
            msg.channel.send(original).then((sentMessage) => {
                var d = new Date
                end = d.getTime();
                res = end - start;
                updated = new discord.MessageEmbed()
                    .setTitle(botName + " Ping")
                    .addField("Gateway Ping", ping + "ms")
                    .addField("MongoDB Ping", mdb + "ms")
                    .addField("Command Response time", commandResponse)
                    .addField("Client Ping", res + "ms")
                    .setColor(color)
                sentMessage.edit(updated);
            });
        });
    },
};