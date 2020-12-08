module.exports = {
    name: 'nitrolite',
    description: 'Allows you to send custom emojis across servers. Simply surround the name if the emoji with "[: :]" and let Gerald do the rest!',
    usage: '/nitrolite emojiName OR \n [:emojiName:]',
    class: 'Useful',
    requiresArgs: true,
    utterances: ["emojis", "nqn", "not quite nitro", "nitro"],
    execute(msg, args, client) {
        try {
            const emojiID = args[0];
            const emoji = client.emojis.cache.find(emoji => emoji.name === emojiID);
            if (emoji.animated) {
                prefix = "<a:";
            } else {
                prefix = "<:";
            }
            const emojiContent = prefix + emoji.name + ":" + emoji.id + ">";
            msg.channel.send(emojiContent);
            msg.delete();
        } catch {}
    },
};