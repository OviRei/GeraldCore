module.exports = {
    name: 'say',
    description: 'Sends a text message',
    usage: '/say [string]',
    class: 'Entertaining',
    requiresArgs: true,
    utterances: ["say something", "repeat after me", "say back to me"],
    execute(msg, args) {
        var str = args.join(" ");
        msg.channel.send(str);
        msg.delete();
    },
};