const Discord = require('discord.js')
const fs = require('fs')
const { defaultPrefix, version, botName, color } = require('../data/config.json')
const { NlpManager } = require('node-nlp')
module.exports = {
    name: 'whatsthatcommand',
    description: 'Get Information about a command depending on a query',
    usage: `${defaultPrefix}whatsthatcommand [query]`,
    class: 'Useful',
    requiresArgs: true,
    async execute(msg, args, client, USocket) {
        console.group("NLP System");
        console.log("Starting...");
        const prefix = defaultPrefix;
        const manager = new NlpManager({ languages: ['en'], forceNER: true, nlu: { useNoneFeature: true } })
        const iconURL = client.user.avatarURL()
        const { commands, services } = client
        var commandTotal = commands.map(command => command.name)
        var serviceTotal = services.map(command => command.name)
        console.log("Loading manager...");
        manager.load()
        console.log("Manager loaded.");
        let query = ''
        console.log("Getting results...");
        msg.content.substring(0, 17) === `${prefix}whatsthatcommand` ? query = msg.content.substring(16 + prefix.length) : query = msg.content.substring(prefix.length)
        console.log("Got results");
        const result = await manager.process('en', query.toLowerCase())
        const intention = result.intent || "None"
        let embed
        if (intention === "None") {
            embed = new Discord.MessageEmbed()
                .setColor(color)
                .setURL('https://www.youtube.com/watch?v=8ybW48rKBME')
                .setAuthor(`${botName} Command AI`, iconURL, 'https://www.youtube.com/watch?v=8ybW48rKBME')
                .setDescription('Let Gerald try to guess what command you mean!')
                .addField('Could Not Assume Correct Command!', `Try another phrase!`, true)
                .setFooter(`${botName} -V ${version}. Running ${serviceTotal.length} services and ${commandTotal.length} commands`, iconURL)
                .setTimestamp();
            await msg.channel.send({ embed: embed })
            console.log("Sent embed");
            console.groupEnd();
            USocket.send("NLP", "No intention found");
        } else {
            embed = new Discord.MessageEmbed()
                .setColor(color)
                .setURL('https://www.youtube.com/watch?v=8ybW48rKBME')
                .setAuthor(`${botName} Command AI`, iconURL, 'https://www.youtube.com/watch?v=8ybW48rKBME')
                .setDescription('Let Gerald try to guess what command you mean!')
                .addField(` Did you mean \`${intention}\`?`, `Run \`${client.commands.get(intention).usage}\`, or \`/help ${intention}\` for more details!`, true)
                .setFooter('React if this suggestion was correct or not to improve the bot!', iconURL)
                .setTimestamp();
            const botMessage = await msg.channel.send({ embed: embed })
            USocket.send("NLP", "Found intention: " + intention);
            console.log("Sent embed");
            console.groupEnd();
            await botMessage.react('👍')
            await botMessage.react('👎')
            const filter = (reaction, user) => ['👍', '👎'].includes(reaction.emoji.name) && user.id === msg.author.id
            const collected = await botMessage.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
            const reaction = collected.first()
            if (reaction.emoji.name === '👍') {
                const corpus = JSON.parse(fs.readFileSync('./data/corpus.json', 'utf8'))
                const corpusData = corpus.data
                const intentData = corpusData.filter(data => data.intent === intention)[0] || null
                if (intentData) {
                    if (intentData.utterances.includes(query) === false) {
                        intentData.utterances.push(query)
                        for (i of corpusData) {
                            const intent = i.intent
                            for (j of i.utterances) {
                                manager.addDocument('en', j, intent)
                            };
                        };
                        await manager.train()
                        fs.writeFileSync('./data/corpus.json', JSON.stringify(corpus, null, 2, 2));
                    };
                };
            };
            embed
                .setFooter(`Thank you for your feedback, @${msg.member.user.tag}!`, iconURL)
            botMessage.edit({ embed: embed })
        }

    }
}