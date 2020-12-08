module.exports = {
    name: 'ask',
    description: 'Ask Gerald a question and he will answer',
    usage: '/ask [question]',
    class: 'Decisions',
    requiresArgs: true,
    utterances: ["choose for me", "help me choose", "should i do it", "should i"],
    execute(msg, args) {
        var replies = ["Yes", "No", "Not a chance", "Absolutely", "Absolutely not", "Without a shadow of a doubt", "You wish", "Maybe not this time", "That sounds like a great idea", "Are you a moron? of course not", "A thousand times yes :D"];

        function getRandomInt(max) {
            return Math.floor(Math.random() * Math.floor(max));
        };
        reply = getRandomInt(replies.length);
        if (!args) {
            msg.channel.send("You must ask a question");
        } else {
            msg.channel.send(replies[reply]);
        }
    },
};