const Discord = require("discord.js");
const { color } = require('../data/config.json');
module.exports = {
    name: 'berry',
    description: 'Guess that berry! You have 15 seconds to enter the correct name of the berry shown!',
    usage: '/berry (to begin game) \nGuess by entering the name of the berry \n/berry get (lists berry options)',
    class: 'Entertaining',
    requiresArgs: false,
    utterances: ["guess the berry", "berry guess", "show me berries", "berries"],
    execute(msg, args) {

        var fruitNames = [
            "pumpkin",
            "cucumber",
            "watermelon",
            "grape",
            "blackberry",
            "blueberry",
            "strawberry",
            "raspberry",
            "golden raspberry",
            "black raspberry",
            "cranberry",
            "chokeberry",
            "elderberry",
            "gooseberry",
            "lingonberry",
            "sloe",
            "boysenberry",
            "redcurrant",
            "blackcurrant",
            "olallieberry",
            "mulberry",
            "acai",
            "goji",
            "physalis",
            "cloud berry",
            "pine berry",
            "salmonberry",
            "avocado",
            "coffee berry",
            "banana",
            "strawberry tree",
            "agarita berry",
            "bilberry",
            "barbados cherry",
            "cherry",
            "plum"
        ]

        var images = [
            "https://www.liveeatlearn.com/wp-content/uploads/2015/10/pumpkin-photo-1.jpg",
            "https://cdn.mos.cms.futurecdn.net/EBEXFvqez44hySrWqNs3CZ.jpg",
            "https://specialtyproduce.com/sppics/11357.png",
            "https://pictures.attention-ngn.com/portal/185/191463/products/1499209833.7975_115_o.jpg",
            "https://www.specialfruit.com/en/thumbnail/productFull/product-1410443781/blackberries.jpg",
            "https://www.freshpoint.com/wp-content/uploads/commodity-blueberry.jpg",
            "https://www.thermofisher.com/blog/food/wp-content/uploads/sites/5/2015/08/single_strawberry__isolated_on_a_white_background.jpg",
            "https://cdn.shopify.com/s/files/1/1733/7409/products/Raspberries_f9263c6c-e4a7-41d9-b6a5-e795446631e4_x700.jpg?v=1539275589",
            "https://images.wisegeek.com/golden-raspberries.jpg",
            "https://phasegenomics.com/wp-content/uploads/2018/03/Black-raspberry_2-e1522437849761.jpeg",
            "https://www.news-medical.net/image.axd?picture=2019%2F1%2Fshutterstock_739372951.jpg",
            "https://cdn-a.william-reed.com/var/wrbm_gb_food_pharma/storage/images/3/0/6/8/2398603-1-eng-GB/Chokeberry-extracts-may-normalize-blood-clotting-Study_wrbm_large.jpg",
            "https://cdn-prod.medicalnewstoday.com/content/images/articles/323/323288/benefits-of-elderberry.jpg",
            "https://static1.squarespace.com/static/545c9a01e4b043f3abfbb28f/545ce9e4e4b01d77329b8310/576d223e2e69cf237ffb09d0/1466784705255/IMG_1174.JPG?format=1500w",
            "https://www.fona.com/wp-content/uploads/2016/02/lingonberry_0.jpg",
            "https://www.collinsdictionary.com/images/full/sloe_60457573.jpg",
            "https://www.fruitsinfo.com/images/hybrid-fruits/boysenberry.jpg",
            "https://www.collinsdictionary.com/images/full/redcurrant_306080708.jpg",
            "https://cdn.ecommercedns.uk/files/1/231541/1/8021971/black-currant.jpg",
            "https://specialtyproduce.com/sppics/7698.png",
            "https://www.nealsyardremedies.com/on/demandware.static/-/Sites-nyr-product-catalog/default/dw10a65858/images/3381/3381-mulberry-large.jpg",
            "https://www.gracefruit.com/uploads/images/products/large/gracefruit_gracefruit_acaiberryoil_1460546395dreamstimemaximum_43852716.jpg",
            "https://www.realfoodsource.com/wp-content/uploads/2016/11/C-GOJIBRY-e1480517101169.jpg",
            "https://cdn.shopify.com/s/files/1/1891/6405/products/shop-online-from-colombia-fruits-cape-gooseberries-physalis-fresh-food-in-dubai-and-abu-dhabi-24622077710_1200x1200.jpg?v=1513195612",
            "https://d3h1lg3ksw6i6b.cloudfront.net/media/image/2019/07/29/a9f504c61b0840b9bb57ca21e851c752_shutterstock-cloudberries-HERO.jpg",
            "https://images-na.ssl-images-amazon.com/images/I/41LBbYMzbgL._AC_SY400_.jpg",
            "https://www.kcaw.org/wp-content/uploads/2012/07/Salmonberries_lg.jpg",
            "https://www.washingtonian.com/wp-content/uploads/2020/02/iStock-1027572462-scaled-2048x1695.jpg",
            "https://avokadoskincare.com/wp-content/uploads/2019/06/coffee-cherry.png",
            "https://cdn.mos.cms.futurecdn.net/42E9as7NaTaAi4A6JcuFwG-1200-80.jpg",
            "https://upload.wikimedia.org/wikipedia/commons/c/cb/Arbouses.jpg",
            "https://texasjellymaking.files.wordpress.com/2011/04/agarita.jpg",
            "https://www.et-chem.com/wp-content/uploads/2017/08/bilberry-extracts-manufacturer-2.jpg",
            "https://draxe.com/wp-content/uploads/2020/01/acerola-cherry-facebook.jpg",
            "https://upload.wikimedia.org/wikipedia/commons/b/bb/Cherry_Stella444.jpg",
            "https://www.treehugger.com/thmb/MUAkeEvYT8uHFuGpYMOf0EVvg3E=/1000x562/smart/filters:no_upscale()/__opt__aboutcom__coeus__resources__content_migration__mnn__images__2018__06__plums-65c0c343f7024361947cffe44bb6d2ba.jpg"
        ];

        if (args[0] === "get") {
            var str = fruitNames.join(", ");
            const BerryNamesEmbed = new Discord.MessageEmbed()
                .setColor(color)
                .setTitle('Guess That Berry!')
                .addField('Berry Names', str, true)
            msg.channel.send(BerryNamesEmbed);
        } else {
            function getRandomInt(max) {
                return Math.floor(Math.random() * Math.floor(max));
            };
            itemNumber = getRandomInt(fruitNames.length);
            const gameStartEmbed = new Discord.MessageEmbed()
                .setColor(color)
                .setTitle(msg.member.user.tag + ', Guess That Berry, You have 15 seconds!')
                .setImage(images[itemNumber])
            msg.channel.send(gameStartEmbed);

            const filter = m => m.author.id === msg.author.id;
            const collector = msg.channel.createMessageCollector(filter, { max: 1, time: 15000, errors: ['time'] });
            collector.on('collect', collected => {
                reply = collected.content.toLowerCase();
                if (reply === fruitNames[itemNumber]) {
                    msg.channel.send("Correct! 🎉 The Berry was **" + fruitNames[itemNumber] + "**")
                } else {
                    msg.channel.send("Incorrect! ❌ The Berry was **" + fruitNames[itemNumber] + "**")
                }
            });
            collector.on('end', collected => {
                var i;
                collected.map(c => i++)
                if (collected.size < 1) {
                    msg.channel.send("Time's up! ⏰ The Berry was **" + fruitNames[itemNumber] + "**")
                }
            });
        }
    },
};