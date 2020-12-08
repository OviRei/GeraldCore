const fs = require('fs');
const corpusFile = require('./data/corpus.json');
const { NlpManager } = require('node-nlp');
const corpus = corpusFile.data;

//extracting files
fs.readdir('./commands', (err, files) => {
    if (err)
        return console.error(err);
    for (file of files) {
        let utterances = require('./commands/' + file).utterances || [];
        const intent = file.substring(0, file.length - 3);
        const intentData = corpus.filter(data => data.intent === intent)[0] || null;
        if (intentData === null && utterances !== []) {
            corpus.push({
                intent: intent,
                utterances: utterances
            });
            continue;
        };
        utterances = utterances.filter(utterance => !intentData.utterances.includes(utterance));
        for (utterance of utterances)
            intentData.utterances.push(utterance);
    };
    fs.writeFileSync('./data/corpus.json', JSON.stringify(corpusFile, null, 2, 2));
});

//training model
const manager = new NlpManager({ languages: ['en'], forceNER: true, nlu: { useNoneFeature: true } });

for (i of corpus) {
    const intent = i.intent;
    for (j of i.utterances) {
        manager.addDocument('en', j, intent);
    };
}
manager.train();