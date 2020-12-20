module.exports = {
    name: 'say',
    description: 'Sends a text message (optionally to a specific channel)',
    usage: '/say [channel (optional)] [message]',
    class: 'Useful',
    requiresArgs: true,
    utterances: ["say something", "repeat after me", "say back to me"],
    execute(msg, args) {
        console.log(args);
        channelID = args[0].replace(/<|!|#|>+/g, "");
        console.log(channelID);
        channel = msg.guild.channels.cache.get(channelID);
        if (channel == undefined) {
            msg.channel.send(args.join(" "));
            msg.delete();
        } else {
            args.shift();
            channel.send(args.join(" "));
        }
    },
};