'use client';

import { useEffect } from 'react';
import TextBox from './textbox';
import Results from './results';
import { useGame } from '../hooks/useGame';
import { tokenize } from '@/lib/check-speech';

export default function Content({
  timer,
  paragraph,
  gameRunning,
  gameOver,
  setGameEnd
}: {
  timer: number;
  paragraph: string;
  gameRunning: boolean;
  gameOver: boolean;
  setGameEnd: () => void;
}) {
  const { startStreaming, stopStreaming, gameStats } = useGame(
    tokenize(paragraph)
  );

  useEffect(() => {
    console.log(gameStats);
    if (gameStats.currentIndex == tokenize(paragraph).length) {
      stopStreaming();
      setGameEnd();
    }
  }, [gameStats]);

  useEffect(() => {
    if (gameRunning) {
      startStreaming();
    }
  }, [gameRunning]);

  return (
    <div className="w-full grid">
      {gameOver ? (
        <Results time={timer} gameStats={gameStats} />
      ) : (
        <TextBox paragraph={paragraph} gameStats={gameStats} />
      )}
    </div>
  );
}
