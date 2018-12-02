const fs = require('fs');
const Keyfeatures = require(__dirname + '/Keyfeatures.js');

const testString1 = fs.readFileSync(__dirname + '/samples/test-1.txt', 'utf-8');

console.log( Keyfeatures.extractKeywords(testString1) );
console.log( Keyfeatures.extractKeyphrases(testString1) );
console.log( Keyfeatures.extractSentiment(testString1) );
