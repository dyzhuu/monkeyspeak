import { useGame } from '../hooks/useGame';
import { tokenize } from '@/lib/check-speech';
import TextBox from './textbox';
import { useEffect, useRef, useState } from 'react';
import React from 'react';
import Results from './results';
import Timer from './timer';

interface GameProps {
  text: string;
  onEsc: () => void;
}

export const Game = ({ text, onEsc }: GameProps) => {
  const tokenizedText = tokenize(text);
  const { startStreaming, stopStreaming, gameStats } = useGame(tokenizedText);
  const [gameRunning, setGameRunning] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [time, setTime] = useState(0);

  const timerIntervalRef = useRef<any>();

  const textboxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (gameRunning) {
      document.addEventListener('keydown', handleKeyDown);
      timerIntervalRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }

    return () => {
      clearInterval(timerIntervalRef.current);
    };
  }, [gameRunning]);

  useEffect(() => {
    if (gameStats.currentIndex >= tokenizedText.length) {
      clearInterval(timerIntervalRef.current);
      setGameRunning(false);
      setShowResults(true);
    }
  }, [gameStats.currentIndex]);

  function handleKeyDown(event: KeyboardEvent) {
    if (event.key == 'Escape' && gameRunning) {
      document.removeEventListener('keydown', handleKeyDown);

      onEsc();
      clearInterval(timerIntervalRef.current);
      setTime(0);
      stopStreaming();
    }
  }

  function startGame() {
    if (showResults) {
      onEsc();
      return;
    }
    setShowResults(false);
    setGameRunning(true);
    startStreaming();
  }

  return (
    <div className="flex flex-col justify-center gap-10 grow">
      <div ref={textboxRef}>
        <TextBox
          tokenizedText={tokenizedText}
          currentIndex={gameStats.currentIndex}
        />
      </div>
      {showResults && <Results time={time} gameStats={gameStats} />}
      <div className="w-full flex justify-center">
        {gameRunning ? (
          <Timer />
        ) : (
          <button
            className="w-[16.25rem] rounded-[1.5rem] font-bold text-3xl text-[#394760] bg-[#9FADC6] p-2 px-5"
            onClick={startGame}
          >
            {showResults ? 'New Game' : 'Start'}
          </button>
        )}
      </div>
    </div>
  );
};
