module.exports = {
    name: 'vote',
    description: 'Vote on a topic of your choice',
    usage: '/vote [topic]',
    class: 'Decisions',
    requiresArgs: true,
    execute(msg, args, client) {
        msg.react("✅");
        msg.react("⛔");

    },
};