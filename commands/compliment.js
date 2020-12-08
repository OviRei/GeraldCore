module.exports = {
    name: 'compliment',
    description: 'Get a compliment :)',
    usage: '/compliment',
    class: 'Wholesome',
    requiresArgs: false,
    utterances: ["say something nice", "compliment me", "compliment someone", "be nice", "say a compliment"],
    execute(msg, args, client) {
        var compliments = [
            "I'm proud of what you've achieved today, even if it was just getting out of bed :)",
            "you bring out the best in people :)", "you always make my day better :)",
            "your smile is like sunshine on a cloudy day :)",
            "I could talk to you for hours and still be left wanting more :)",
            "your eyes are so warm and welcoming :)",
            "your smile is infectious :)",
            "I'm proud of how far you've come :)",
            "Don't let anyone get you down, you are a powerful and amazing person :)",
            "I've never met someone like you before :)"
        ];

        function getRandomInt(max) {
            return Math.floor(Math.random() * Math.floor(max));
        };
        itemNumber = getRandomInt(compliments.length);
        msg.channel.send(compliments[itemNumber]);
    },
};