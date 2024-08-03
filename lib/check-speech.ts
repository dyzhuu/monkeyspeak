export function tokenize(text: string): string[] {
  // regex remove anything that's not alnum
  const res = text.replace(/[^\w\s]|_/g, ' ');

  return res.split(' ').filter((w) => w !== '');
}

export type speechStats = {
  currentIndex: number;
  total: number;
  correct: number;
  incorrect: number;
};

export function checkSpeech({
  baseText,
  speechText,
  currentIndex
}: {
  baseText: string[];
  speechText: string;
  currentIndex: number;
}): speechStats {
  const spokenText: string[] = tokenize(speechText);

  const total = spokenText.length;
  let correct = 0;

  for (let i = 0; i < spokenText.length; i++) {
    if (spokenText[i].toLowerCase() == baseText[currentIndex].toLowerCase()) {
      correct++;
      currentIndex++;
    }
  }

  return {
    currentIndex,
    total,
    correct,
    incorrect: total - correct
  };
}
