const { afkList, reasons } = require("../data/afklist.json");
const fs = require("fs");
module.exports = {
    name: 'afk service',
    enabled: true,
    execute(msg, client) {
        if (afkList.includes(msg.author.id)) {
            var pos = afkList.indexOf(msg.author.id);
            afkList.splice(pos, 1);
            reasons.splice(pos, 1);
            var data = { "afkList": afkList, "reasons": reasons };
            fs.writeFile("./data/afklist.json", JSON.stringify(data), (err) => {
                if (err) {
                    console.error(err);
                    return;
                };
            })
        } else {
            try {
                var mention = msg.mentions.users.first().id;
                pos = afkList.indexOf(mention);
                reason = reasons[pos];
                if (afkList.includes(mention)) {
                    user = client.users.cache.get(mention).tag;
                    msg.channel.send("**" + user + "** is AFK: " + reason);
                }
            } catch (e) {
                return;
            }
        }
    },
};