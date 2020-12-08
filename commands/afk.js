const { afkList, reasons } = require("../data/afklist.json");
const fs = require("fs");
module.exports = {
    name: 'afk',
    description: 'People will be notified if they ping you that you are AFK. AFK status ends when you send a message.',
    usage: '/afk [reason]',
    class: 'Useful',
    requiresArgs: true,
    utterances: ["im going offline", "im going afk", "ill be back", "im coming back", "offline", "away from keyboard"],
    execute(msg, args, client) {
        if (!afkList.includes(msg.author.id)) {
            reason = args.join(" ")
            afkList.push(msg.author.id);
            reasons.push(reason);
            var data = { "afkList": afkList, "reasons": reasons };
            fs.writeFile("./data/afklist.json", JSON.stringify(data), (err) => {
                if (err) {
                    console.error(err);
                    return;
                };
            });
            msg.channel.send("**" + msg.author.tag + "** is now AFK: " + reason);
        }
    },
};