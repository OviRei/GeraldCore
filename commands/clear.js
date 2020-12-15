module.exports = {
    name: 'clear',
    description: 'Clears messages (2-100)',
    usage: '/clear [message count]',
    class: 'Useful',
    requiresArgs: true,
    utterances: ["delete messages", "delete", "bulk delete", "clear the chat", "remove the spam"],
    execute(msg, args) {
        var messageCount = parseInt(args[0], 10);
        messageCount++;
        if (messageCount > 100) {
            messageCount = 100;
        }
        msg.delete();
        msg.channel.bulkDelete(messageCount)
    },
};