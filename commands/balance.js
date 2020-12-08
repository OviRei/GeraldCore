const { botName } = require("../data/config.json");
var mongo = require('mongodb-wrapper');
var balanceDB = mongo.db('localhost', 27017, botName);
balanceDB.collection('balances');
module.exports = {
    name: 'balance',
    description: 'See how much cash you have!',
    usage: '/balance',
    class: 'Currency',
    requiresArgs: false,
    utterances: ["how much money do i have", "show me my balance", "what is my balance", "how rich am i", "cash"],
    execute(msg, args, client) {
        balanceDB.balances.find({ ID: msg.author.id }).toArray(function(err, posts) {
            if (!posts.length) {
                msg.channel.send("You have 0💵. Use the hourly command to get some!")
            } else {
                var cashInc = parseInt(posts[0].CASH);
                msg.channel.send("You have " + cashInc + "💵");
            }
        })

    },
};