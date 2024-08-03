type scoreStats = {
  accuracy: number;
  wordsPerMinute: number;
};

export function statsCalculator(
  currentIndex: number,
  total: number,
  correct: number,
  incorrect: number,
  time: number
) {
  const accuracy = Math.round((correct / total) * 100);
  console.log(accuracy);

  const wordsPerMinute = Math.round((correct * 60) / time);
  console.log(wordsPerMinute);

  return {
    accuracy,
    wordsPerMinute
  };
}

console.log(statsCalculator(17, 17, 15, 2, 37));
