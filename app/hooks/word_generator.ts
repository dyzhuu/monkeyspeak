const sentences = require('../words.json').sentences;

function getRandomSentence(sentences: string[]) {
  const randomIndex = Math.floor(Math.random() * sentences.length);
  return sentences[randomIndex];
}

export function generateRandomParagraph() {
  const numOfSentences = 1;
  // Number of sentences chosen cannot exceed amount of sentences available
  if (numOfSentences > sentences.length) {
    console.error(
      'Number of sentences cannot exceed amount of sentences available'
    );
    return '';
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
  return res;
}
