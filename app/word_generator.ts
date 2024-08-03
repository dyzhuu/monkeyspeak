const words = require('./words.json');

function getRandomSentence(sentences: string[]) {
  const randomIndex = Math.floor(Math.random() * sentences.length);
  return sentences[randomIndex];
}

function generateRandomParagraph(sentences: string[], numOfSentences: number) {

  // Number of sentences chosen cannot exceed amount of sentences available
  if (numOfSentences > sentences.length) {
    console.error("Number of sentences cannot exceed amount of sentences available");
    return [];
  }

  // Pre-allocate chosen sentences
  let chosen: string[] = [];

  for (let i = 0; i < numOfSentences; i++) {
    var sentence = getRandomSentence(sentences);
    // While sentence already chosen, keep getting a random sentence
    while (chosen.includes(sentence)) {
      sentence = getRandomSentence(sentences);
    }
    chosen.push(sentence);
  }

  // Join chosen sentences with ". ", added with "." for the final sentence
  let res: string = chosen.join('. ');
  return res + '.';
}
