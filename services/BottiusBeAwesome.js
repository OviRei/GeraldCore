module.exports = {
    name: 'BottiusBeAwesome',
    enabled: true,
    execute(msg, client) {
        const phrases = [
            "Bottius more like is awesome :sunglasses:",
            "My homie Bottius <3",
            "Cool kiddo ^",
            "*Hugs Bottius* >:)"
        ];

        function getRandomInt(max) {
            return Math.floor(Math.random() * Math.floor(max));
        };
        if (msg.content === "A lot of nothing in here... <:tumbleweed:764588927842910219>" && (msg.author.id == "639135241562488841" || msg.author.id == "497341083949465600")) {
            index = getRandomInt(phrases.length);
            console.log(index);
            msg.channel.send(phrases[index]);
        }
    },
};