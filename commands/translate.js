const translate = require('@vitalets/google-translate-api');
module.exports = {
    name: 'translate',
    description: 'Allows you to translate any language used by Google Translate! ',
    usage: '/translate [country code] [text]',
    class: 'Useful',
    requiresArgs: true,
    utterances: [],
    execute(msg, args, client) {


        translate('I speak english', { to: 'de' }).then(res => {
            console.log(res);
        }).catch(err => {
            console.error(err);
        });
    },
};