module.exports = {
    name: 'coinflip',
    description: 'flip a coin',
    usage: '/coinflip',
    class: 'Random',
    requiresArgs: false,
    utterances: ["flip a coin", "heads or tails", "flip", "flip coin", "random flip"],
    execute(msg, args) {
        msg.channel.send('Flipping...');
        var number = Math.floor(Math.random() * 10);
        if (number > 5) {
            msg.channel.send('Heads wins!');
        } else {
            msg.channel.send('Tails wins!');
        }

    },
};