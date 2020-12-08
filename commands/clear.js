module.exports = {
    name: 'clear',
    description: 'Clears messages (2-100)',
    usage: '/clear [message count]',
    class: 'Useful',
    requiresArgs: true,
    utterances: ["delete messages", "delete", "bulk delete", "clear the chat", "remove the spam"],
    execute(msg, args) {
        var messageCount = parseInt(args[0], 10);
        msg.channel.bulkDelete(messageCount).then(() => {
            msg.channel.send("Deleted " + messageCount + " messages");
        });
    },
};