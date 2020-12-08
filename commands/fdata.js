const flight = require('flightradar24-client/lib/flight');
const { color } = require("../data/config.json");
const Discord = require("discord.js");
const gis = require('g-i-s');
module.exports = {
    name: 'fdata',
    description: 'Get information about a flight from FlightRadar24',
    usage: '/fdata [flightID]',
    class: 'Entertaining',
    requiresArgs: true,
    utterances: ["flight stats", "show me flights", "i want to see flights", "show planes", "plane stats"],
    execute(msg, args, client) {
        const flightID = args[0];
        try {
            flight(flightID)
                .then(flightInfo => {
                    var origin = flightInfo.origin.name;
                    var destination = flightInfo.destination.name;
                    var callsign = flightInfo.callsign;
                    var registration = flightInfo.registration;
                    var model = flightInfo.model;
                    var id = flightInfo.id;
                    var departure = flightInfo.departure;
                    var arrival = flightInfo.arrival;
                    var planeImage;
                    gis(model, logResults);

                    function logResults(error, results) {
                        if (error) {
                            console.log(error);
                        } else {
                            planeImage = JSON.stringify(results[0].url, null, '  ');
                            planeImage = planeImage.substring(1, planeImage.length - 1)
                            console.log(planeImage);
                        }
                    }

                    function sendEmbed() {
                        const flightEmbed = new Discord.MessageEmbed()
                            .setColor(color)
                            .setImage(planeImage)
                            .setTitle("Flight " + id)
                            .setURL("https://www.flightradar24.com/" + id)
                            .addField("Origin", origin)
                            .addField("Destination", destination)
                            .addField("Departure Time", departure)
                            .addField("Arrival Time", arrival)
                            .addField("Callsign", callsign, true)
                            .addField("Registration", registration, true)
                            .addField("Aircraft Model", model, true)
                            .setFooter("Data from FlightRadar24", "https://lh3.googleusercontent.com/IxxF4rt1_5dQmlqaT2B-0KrF2mmwa_BNsHnkrPg1RsRAWCpT124I_r7rPKBbL1GtSo_e")
                        msg.channel.send(flightEmbed)
                    }
                    setTimeout(sendEmbed, 1500)
                })
        } catch (error) {
            console.error(error);
            msg.channel.send("Flight not found");
        }
    },
};