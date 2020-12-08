var giphy = require('giphy-api')();
module.exports = {
    name: 'gif',
    description: 'Get a gif from Giphy',
    usage: '/gif [tags]',
    class: 'Random',
    requiresArgs: true,
    utterances: ["show me gifs", "giphy", "gif images", "tenor"],
    execute(msg, args, client) {
        term = args.join("+");
        giphy.search(term).then(function(res) {
            function getRandomInt(max) {
                return Math.floor(Math.random() * Math.floor(max));
            };
            itemNumber = getRandomInt(res.pagination.count);
            msg.channel.send(res.data[itemNumber].url);
        });
    },
};