module.exports = {
    name: 'impersonate',
    description: 'Allows you to send a message as another user',
    usage: 'impersonate [@user#1234] [message]',
    class: 'Entertaining',
    requiresArgs: true,
    utterances: ["Impersonate someone", "become someone", "impostor", "become", "pretend"],
    execute(msg, args, client) {
        if (msg.channel.type === "dm") {
            return msg.channel.send("This is only available in guilds!");
        }
        if (!args[0]) {
            return msg.channel.send("You need to mention someone!");
        }
        if (!args[1]) {
            return msg.channel.send("You need to enter a message!");
        }

        user = msg.mentions.users.first();

        const member = msg.guild.member(user);


        name = member.nickname !== null ? member.nickname : msg.mentions.users.first().username;

        var text = msg.content.split(/ +/);
        text.splice(0, 2);
        final = text.join(" ");
        msg.channel.createWebhook(name, {
                avatar: msg.mentions.users.first().avatarURL(),
            })
            .then(webhook => {
                webhook.send(final).then(message => webhook.delete());
            })
            .catch(console.error);
        msg.delete();
    },
};