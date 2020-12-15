module.exports = {
    name: 'nitrolite service',
    enabled: true,
    execute(msg, client) {
        if (msg.channel.type == "dm") {
            return;
        }
        if (msg.author.bot) {
            return;
        }
        var changed = false;
        var text = msg.content.split(/ |\n+/g);
        for (var i = 0; i < text.length; i++) {
            element = text[i];
            if (element.startsWith("[:") && element.endsWith(":]")) {
                const emojiID = element.substring(2, element.length - 2);
                const emoji = client.emojis.cache.find(emoji => emoji.name === emojiID);
                if (emoji.animated) {
                    prefix = "<a:";
                } else {
                    prefix = "<:";
                }
                emojiContent = prefix + emoji.name + ":" + emoji.id + ">";
                text[i] = emojiContent;
                changed = true;
            }
        }
        var name = msg.member.nickname !== null ? msg.member.nickname : msg.author.username;
        var final = text.join(" ");
        try {
            if (changed) {
                msg.channel.createWebhook(name, {
                        avatar: msg.author.displayAvatarURL({ size: 2048 }),
                    })
                    .then(webhook => {
                        webhook.send(final).then(message => webhook.delete());
                    })
                    .catch(error => {
                        msg.channel.send(final);
                        msg.author.send("Nitrolite needs `manage webhooks` and `manage messages` permissions to work to its full potential! Contact your server Admin!")
                    });
                msg.delete();
            }
        } catch (error) {
            console.log(error);
        }
    },
};