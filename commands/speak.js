module.exports = {
    name: 'speak',
    description: 'Sends a TTS message',
    usage: '/speak [string]',
    class: 'Entertiaining',
    requiresArgs: true,
    execute(msg, args) {
        var str = args.join(" ");
        msg.channel.send(str, { tts: true })
        msg.delete();
    },
};