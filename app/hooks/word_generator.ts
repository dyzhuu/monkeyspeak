const sentences = require('../words.json').sentences;
const easy = require('../words.json').easy;
const hard = require('../words.json').hard;

function getRandomSentence(sentences: string[]) {
  const randomIndex = Math.floor(Math.random() * sentences.length);
  return sentences[randomIndex];
}

export function generateRandomParagraph(difficulty = 1) {
  let sentence = getRandomSentence(sentences);
  if (difficulty == 0) {
    sentence = getRandomSentence(easy);
  } else if (difficulty == 2) {
    sentence = getRandomSentence(hard);
  }

  return sentence;
}
