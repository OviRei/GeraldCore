module.exports = {
    name: '8ball',
    description: 'Ask Gerald a question and he will answer with Yes/No',
    usage: '/8ball [question]',
    class: 'Decisions',
    requiresArgs: true,
    utterances: ["magic 8 ball", "8b", "decisions", "yes or no"],
    execute(msg, args) {
        var replies = ["Yes", "No"];

        function getRandomInt(max) {
            return Math.floor(Math.random() * Math.floor(max));
        };
        reply = getRandomInt(replies.length);
        msg.channel.send(replies[reply]);
    },
};