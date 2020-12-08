const { botName } = require("../data/config.json");
var mongo = require('mongodb-wrapper');
var balanceDB = mongo.db('localhost', 27017, botName);
balanceDB.collection('balances');
var cooldownDB = mongo.db('localhost', 27017, botName);
cooldownDB.collection('cooldowns');
module.exports = {
    name: 'hourly',
    description: 'Get cash every hour',
    usage: '/hourly',
    class: 'Currency',
    requiresArgs: false,
    utterances: ["earn money", "hourly money", "earn cash", "get cash"],
    execute(msg, args, client) {
        function updateBalance(id) {
            balanceDB.balances.find({ ID: msg.author.id }).toArray(function(err, posts) {
                var currentBal = parseInt(posts[0].CASH);
                var updatedBal = currentBal + 10;
                balanceDB.balances.update({ ID: msg.author.id }, { $set: { CASH: updatedBal } });
                msg.channel.send("You now have " + updatedBal + "💵");
            })
        }

        function msToMinutes(ms) {
            var minutes = Math.floor(ms / 60000);
            var seconds = Math.floor((ms - (minutes * 60000)) / 1000);
            return minutes + "m " + seconds + "s";
        }
        cooldownDB.cooldowns.find({ ID: msg.author.id }).toArray(function(err, posts) {
            if (!posts.length) {
                cooldownDB.cooldowns.insert({ "ID": msg.author.id, "COOLDOWN": msg.createdTimestamp })
                balanceDB.balances.insert({ "ID": msg.author.id, "CASH": 10 })
                msg.channel.send("You now have 10💵")
            } else {
                timeLeft = msg.createdTimestamp - posts[0].COOLDOWN;
                if (timeLeft < 3600000) {
                    msg.channel.send("You need to wait " + msToMinutes(3600000 - timeLeft));
                } else {
                    cooldownDB.cooldowns.update({ ID: msg.author.id }, { $set: { COOLDOWN: msg.createdTimestamp } });
                    updateBalance(msg.author.id);
                }
            }
        })

    },
};