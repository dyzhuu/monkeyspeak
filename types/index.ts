export type speechStats = {
  currentIndex: number;
  total: number;
  correct: number;
  incorrect: number;
};

export type Player = {
  id: string;
  currentIndex?: number;
};
