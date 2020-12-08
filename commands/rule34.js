const https = require('https');
const xml2js = require('xml2js');
const Discord = require('discord.js');
const { color } = require('../data/config.json');
module.exports = {
    name: 'rule34',
    description: 'Gets an image from rule34 using specified tags',
    usage: '/rule34 [tag(s)]',
    class: 'NSFW',
    requiresArgs: true,
    execute(msg, args) {
        if (args.length == 0) {
            msg.channel.send("You must specify at least **one** tag");
        } else {
            var str = args[0];
            for (i = 1; i < args.length; i++) {
                var str = str + " " + args[i];
            }
            var argR = str;
            argR = argR.replace(/ /g, "_");
            var url = 'https://rule34.xxx/index.php?page=dapi&s=post&q=index&tags=' + argR;
            https.get(url, function(res) {
                var body = '';
                res.on('data', function(chunk) {
                    body += chunk;
                });
                res.on('end', function() {
                    var parser = new xml2js.Parser();
                    parser.parseString(body, function(err, result) {
                        var postCount = result.posts.$.count - 1;
                        if (postCount > 100) {
                            postCount = 100;
                        }
                        if (postCount > 0) {
                            var picNum = Math.floor(Math.random() * postCount) + 0;
                            var r34Pic = result.posts.post[picNum].$.file_url;
                            const ruleEmbed = new Discord.MessageEmbed()
                                .setColor(color)
                                .setTitle('Rule34 Result:')
                                .setImage(r34Pic);
                            msg.channel.send(ruleEmbed);
                        } else {
                            msg.channel.send("Nothing Found");
                        }
                    });
                });
            }).on('error', function(e) {
                console.log("Got an error: ", e);
            });
        }
    },
};