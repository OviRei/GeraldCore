const discord = require("discord.js");
const axios = require("axios");
const { color } = require("../data/config.json");
module.exports = {
    name: 'covid',
    description: 'Get global Covid-19 information, and information for a specific country. If the specified country is not found, global stats will be reported.',
    usage: 'covid or covid [country]',
    class: 'Useful',
    requiresArgs: false,
    execute(msg, args, client) {
        if (!args[0]) {
            country = "Global"
        } else {
            country = args.join(" ");
        }

        function numberWithCommas(x) {
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }

        function titleCase(str) {
            var splitStr = str.toLowerCase().split(' ');
            for (var i = 0; i < splitStr.length; i++) {
                splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
            }
            return splitStr.join(' ');
        }
        country = titleCase(country);
        axios({
            "method": "GET",
            "url": "https://covid-19-coronavirus-statistics.p.rapidapi.com/v1/total",
            "headers": {
                "content-type": "application/octet-stream",
                "x-rapidapi-host": "covid-19-coronavirus-statistics.p.rapidapi.com",
                "x-rapidapi-key": "25d007070amsh3666a7a20acf006p161f9bjsnb2ee25828560",
                "useQueryString": true
            },
            "params": {
                "country": country
            }
        })

        .then((response) => {
                res = response.data.data;
                console.log(res);
                const covidEmbed = new discord.MessageEmbed()
                    .setTitle(res.location)
                    .setColor(color)
                    .addField("Confirmed Cases", numberWithCommas(res.confirmed))
                    .addField("Recovered Cases", numberWithCommas(res.recovered))
                    .addField("Confirmed Deaths", numberWithCommas(res.deaths))
                    .setFooter("See World Health Organisation for advice", "https://www.who.int/images/default-source/infographics/who-emblem.png?sfvrsn=877bb56a_2")
                msg.channel.send(covidEmbed);
            })
            .catch((error) => {
                console.log(error)
            })
    },
};