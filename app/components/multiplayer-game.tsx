import { useGame } from '../hooks/useGame';
import { tokenize } from '@/lib/check-speech';
import TextBox from './textbox';
import { useEffect, useRef, useState } from 'react';
import React from 'react';
import Results from './results';
import Timer from './timer';

interface MultiplayerGameProps {
  text: string;
  onStatsChange: (currentIndex: number) => void;
}

export const MultiplayerGame = ({
  text,
  onStatsChange
}: MultiplayerGameProps) => {
  const tokenizedText = tokenize(text);
  const { startStreaming, gameStats } = useGame(tokenizedText);
  const [gameStarted, setGameStarted] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [time, setTime] = useState(0);

  const timerIntervalRef = useRef<any>();

  const textboxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    timerIntervalRef.current = setInterval(() => {
      setTime((prevTime) => prevTime + 1);
    }, 1000);

    return () => {
      clearInterval(timerIntervalRef.current);
    };
  }, []);

  useEffect(() => {
    onStatsChange(gameStats.currentIndex);
  }, [gameStats.currentIndex]);

  useEffect(() => {
    if (gameStats.currentIndex >= tokenizedText.length) {
      clearInterval(timerIntervalRef.current);
      setShowResults(true);
    }
  }, [gameStats.currentIndex]);

  function startGame() {
    startStreaming();
    setGameStarted(true);
  }

  return (
    <div className="flex flex-col justify-center gap-10 grow">
      {gameStarted ? (
        <>
          <div ref={textboxRef}>
            <TextBox paragraph={text} gameStats={gameStats} />
          </div>

          <div className="w-full flex flex-col justify-center items-center">
            {showResults ? (
              <>
                <Results time={time} gameStats={gameStats} />
                <button
                  onClick={() => window.location.reload()}
                  className="bg-[#394760] text-white p-2 rounded-md"
                >
                  Return
                </button>
              </>
            ) : (
              <Timer />
            )}
          </div>
        </>
      ) : (
        <button
          onClick={startGame}
          className="bg-[#394760] text-white p-2 rounded-md"
        >
          Click to start
        </button>
      )}
    </div>
  );
};
