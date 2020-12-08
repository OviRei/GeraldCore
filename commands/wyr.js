const fetch = require('node-fetch');
const jsdom = require('jsdom');
module.exports = {
    name: 'wyr',
    description: 'Play a game of Would You Rather',
    usage: 'wyr',
    class: 'Entertaining',
    requiresArgs: false,
    async execute(msg, args, client) {
        msg.channel.startTyping();
        await fetch('https://either.io')
            .then(res => res.text())
            .then(async body => {
                var dom = new jsdom.JSDOM(body);
                var ae = dom.window.document.querySelector('div.result.result-1 > .option-text');
                var be = dom.window.document.querySelector('div.result.result-2 > .option-text');
                msg.channel.send("Would You Rather:\n🅰 - " + ae.textContent + "\n🅱 - " + be.textContent).then(message => {
                    message.react('🅰');
                    message.react('🅱');
                    msg.channel.stopTyping();
                })
            });
    }
}