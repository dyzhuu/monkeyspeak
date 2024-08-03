function removePunctuation(text: string): string[] {
  // regex remove anything that's not alnum
  const res = text.replace(/[^\w\s]|_/g, ' ');

  return res.split(' ').filter((w) => w !== '');
}

type speechStats = {
  currentIndex: number;
  total: number;
  correct: number;
  incorrect: number;
};

function checkSpeech({
  baseText,
  speech,
  currentIndex
}: {
  baseText: string;
  speech: string;
  currentIndex: number;
}): speechStats {
  const words: string[] = removePunctuation(baseText);
  const spoke: string[] = removePunctuation(speech);

  const total = spoke.length;
  let correct = 0;

  for (let i = 0; i < spoke.length; i++) {
    if (spoke[i].toLowerCase() == words[currentIndex].toLowerCase()) {
      correct++;
      currentIndex++;
      console.log('MATCHED! ' + spoke[i]);
    }
    console.log(words[currentIndex]);
  }

  return {
    currentIndex,
    total,
    correct,
    incorrect: total - correct
  };
}

let currentIndex = 0;
let stats = checkSpeech({
  baseText: 'BRUHUAS SASD 11 ash hello bruh? twenty-seven, bro!.',
  speech: 'hallo',
  currentIndex: 0
});
stats = checkSpeech({
  baseText: 'BRUHUAS SASD 11 ash hello bruh? twenty-seven, bro!.',
  speech: 'BRUHUAS hello SASD 11',
  currentIndex: 0
});

console.log(stats);

stats = checkSpeech({
  baseText: 'BRUHUAS SASD 11 ash hello bruh? twenty-seven, bro!.',
  speech: 'hallo',
  currentIndex: 0
});
