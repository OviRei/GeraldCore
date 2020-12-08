module.exports = {
    name: 'spam',
    description: 'Spams a message up to 50 times',
    usage: '/spam [count] [string]',
    class: 'Unlisted',
    requiresArgs: true,
    execute(msg, args) {
        if (msg.guild.id == 378631350401368064) {
            var count = args[0]
            args.shift();
            str = args.join(" ");
            for (i = 0; i < count; i++) {
                msg.channel.send(str);
            }
        }
    },
};