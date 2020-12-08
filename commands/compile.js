const axios = require('axios');
const discord = require("discord.js");
const { color } = require("../data/config.json");
module.exports = {
    name: 'compile',
    description: 'Allows you to run code via Wandbox.',
    usage: 'compile \`\`\`[language name] [code] \`\`\` or compile languages (to get a list of supported languages)',
    class: 'Useful',
    requiresArgs: true,
    utterances: [],
    execute(msg, args, client, prefix) {
        //Language Dictionary
        const languages = [{
                "name": "js",
                "compiler": "nodejs-head"
            },
            {
                "name": "javascript",
                "compiler": "nodejs-head"
            },
            {
                "name": "c++",
                "compiler": "gcc-head"
            },
            {
                "name": "cpp",
                "compiler": "gcc-head"
            },
            {
                "name": "py",
                "compiler": "cpython-head"
            },
            {
                "name": "python",
                "compiler": "cpython-head"
            },
            {
                "name": "cs",
                "compiler": "mono-head"
            },
            {
                "name": "csharp",
                "compiler": "mono-head"
            },
            {
                "name": "c",
                "compiler": "gcc-head-c"
            },
            {
                "name": "java",
                "compiler": "openjdk-head"
            },
            {
                "name": "ts",
                "compiler": "typescript-3.9.5"
            },
            {
                "name": "typescript",
                "compiler": "typescript-3.9.5"
            },
            {
                "name": "bash",
                "compiler": "bash"
            },
            {
                "name": "php",
                "compiler": "php-head"
            },
            {
                "name": "pas",
                "compiler": "fpc-head"
            },
            {
                "name": "delphi",
                "compiler": "delphi-mode"
            },
            {
                "name": "rust",
                "compiler": "rust-head"
            },
            {
                "name": "rs",
                "compiler": "rust-head"
            },
            {
                "name": "lua",
                "compiler": "lua-5.4.0"
            }
        ]
        if (args[0] === "languages") {
            languageList = languages.map(l => l.name);
            languageList = languageList.join("\n")
            return msg.channel.send("**Supported Languages:**\n```\n" + languageList + "\n```");
        }

        content = msg.content.substr(msg.content.indexOf("```") + 3, msg.content.length);
        let language = content.substr(0, content.indexOf('\n')).trim();
        console.log(language);

        let source = msg.content.substring(msg.content.indexOf(language) + language.length, msg.content.length);
        source = source.replace(/```+/g, "");

        langObj = languages.find(l => l.name == language);
        if (langObj == null) {
            return msg.channel.send("**That language is not supported or you have entered the name incorrectly**");
        }

        //Compiler System (WORKING)
        var payload = {
            "code": source,
            "compiler": langObj.compiler
        }
        axios.post('https://wandbox.org/compile', JSON.stringify(payload))
            .then(res => {
                result = res.data;
                result = result.replace(/data:|\r|Control:Start|Control:Finish/g, "");
                result = result.replace(/`/g, "'");
                data = result.split("\n");
                data = data.filter(x => x != '');
                data = data.filter(x => x != ' ');
                data = data.filter(x => { if (isNaN(x)) { return x } });
                final = data.join("\n");
                const embed = new discord.MessageEmbed()
                    .setColor(color)
                    .setTitle("Execution Result")
                    .addField("Language", language, true)
                    .addField("Compiler", langObj.compiler, true)
                    .setDescription("```\n" + final + "\n```")
                    .setTimestamp()
                    .setFooter("Requested by " + msg.author.tag)
                msg.channel.send(embed);
            })
            .catch(error => {
                const embed = new discord.MessageEmbed()
                    .setColor(color)
                    .setTitle("Execution Error")
                    .addField("Language", language, true)
                    .addField("Compiler", langObj.compiler, true)
                    .setDescription("```\nA server error occurred. Check your code and try again.\n```")
                    .setTimestamp()
                    .setFooter("Requested by " + msg.author.tag)
                msg.channel.send(embed);
            });
    },
};