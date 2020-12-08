const https = require('https');
module.exports = {
    name: 'fact',
    description: 'description',
    usage: '/commandName [args]',
    class: 'Entertaining',
    requiresArgs: false,
    utterances: ["tell me something", "did you know", "tell me a fact", "teach me"],
    execute(msg, args, client) {
        https.get('https://uselessfacts.jsph.pl/random.json?language=en', (resp) => {
            let data = '';
            resp.on('data', (chunk) => {
                data += chunk;
            });
            resp.on('end', () => {
                res = JSON.parse(data);
                final = res.text.replace(/`/g, "'");
                msg.channel.send(final);
            });
        }).on("error", (err) => {
            console.log("Error: " + err.message);
        });
    },
};