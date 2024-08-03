'use client';

import { useRef, useState, useEffect } from 'react';

import TextBox from './textbox';
import Results from './results';

export default function Main() {
  const [timerInterval, setTimerInterval] = useState<NodeJS.Timeout>();
  const [gameOver, setGameOver] = useState(false);
  const [gameRunning, setGameRunning] = useState(false);
  const [timer, setTimer] = useState(0);

  function startGame() {
    setTimer(0);

    setGameRunning(true);
    setGameOver(false);
  }

  function endGame() {
    setGameRunning(false);

    document.removeEventListener('keydown', handleKeyDown);
  }

  function handleKeyDown(event: KeyboardEvent) {
    if (event.key == 'Escape' && gameRunning) {
      endGame();
    }
  }

  useEffect(() => {
    if (gameRunning) {
      document.addEventListener('keydown', handleKeyDown);

      setTimerInterval(
        setInterval(() => {
          setTimer((prevTimer) => prevTimer + 1);
        }, 1000)
      );
    }

    return () => {
      clearInterval(timerInterval);
    };
  }, [gameRunning]);

  return (
    <div className="flex flex-col justify-center px-20 grow">
      <h1 className="font-bold text-5xl text-[#9FADC6] mb-4">monkeyspeak</h1>

      <div
        onAnimationEndCapture={() => {
          setGameOver(!gameOver);
        }}
        className="mb-8 grid"
      >
        {gameOver ? <Results /> : <TextBox text={'test'} index={0} />}
      </div>

      <div className="flex justify-center items-center">
        {gameRunning ? (
          <h2 className="rounded-[5rem] font-bold text-4xl text-[#9FADC6]">
            {timer}
          </h2>
        ) : (
          <button
            onClick={() => {
              gameOver ? setGameOver(false) : startGame();
            }}
            className="rounded-[5rem] font-bold text-2xl text-[#394760] bg-[#9FADC6] p-2 px-5"
          >
            {gameOver ? 'Restart' : 'Start'}
          </button>
        )}
      </div>
    </div>
  );
}
