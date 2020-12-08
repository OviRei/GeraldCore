const { botName } = require("../data/config.json");
var mongo = require('mongodb-wrapper');
var db = mongo.db('localhost', 27017, botName);
db.collection('tunnels');
module.exports = {
    name: 'Tunnel Service',
    enabled: true,
    execute(msg, client) {
        function getUserFromMention(mention) {
            if (mention === "@everyone") {
                return "`@everyone`"
            }
            if (mention === "@here") {
                return "`@here`"
            }
            if (!mention) return;
            if (mention.startsWith('<@') && mention.endsWith('>')) {
                mention = mention.slice(2, -1);
                if (mention.startsWith('!')) {
                    mention = mention.slice(1);
                }
                return "`@" + msg.guild.member(mention).user.tag + "`";
            } else {
                return mention;
            }
        }
        if (!msg.author.bot) {
            db.tunnels.find({ ping: msg.channel.id }).toArray(function(err, posts) {
                if (!posts[0]) {
                    return;
                } else {
                    content = msg.content.split(/ +/);
                    newContent = [];
                    content.forEach(element => {
                        newContent.push(getUserFromMention(element));
                    });
                    content = newContent.join(" ");
                    message = "**" + msg.author.tag + "**: " + content;
                    try {
                        client.channels.cache.get(posts[0].pong).send(message);
                    } catch {
                        db.tunnels.remove({ ping: msg.channel.id });
                        db.tunnels.remove({ ping: posts[0].pong });
                        msg.channel.send("Tunnel error. Opposite end may have been deleted ⛏⛔");
                    }
                }
            });
        }
    },
};