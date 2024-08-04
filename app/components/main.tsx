'use client';

import { useState, useEffect } from 'react';

import { generateRandomParagraph } from '../hooks/word_generator';

import Content from './content';

export default function Main() {
  const [gameOver, setGameOver] = useState(false);
  const [gameRunning, setGameRunning] = useState(false);
  const [paragraph, setParagraph] = useState(generateRandomParagraph());

  const [timer, setTimer] = useState(0);
  const [isMounted, setIsMounted] = useState(true);

  function toggleAnimation(element: HTMLElement, animation: string) {
    element.classList.remove(animation);
    element.offsetHeight;
    element.classList.add(animation);
  }

  function resetGame() {
    setIsMounted(false);

    setParagraph(generateRandomParagraph());
    setGameOver(false);

    setTimeout(() => {
      setIsMounted(true);
    }, 0);
  }

  function startGame() {
    setTimer(0);

    setGameRunning(true);
  }

  function endGame() {
    setGameRunning(false);
    setGameOver(true);
  }

  function handleEsc(event: { key: string }) {
    if (event.key == 'Escape') {
      document.removeEventListener('keydown', handleEsc);
      endGame();
    }
  }

  useEffect(() => {
    if (gameRunning) {
      document.addEventListener('keydown', handleEsc);

      const timerInterval = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
      }, 1000);

      return () => {
        clearInterval(timerInterval);
      };
    }
  }, [gameRunning]);

  return (
    <div className="flex flex-col justify-center content-center">
      <div className="min-h-[20vh] flex flex-col justify-center items-center gap-5">
        {isMounted && (
          <div className="min-h-[20vh] flex justify-center items-center">
            <Content
              timer={timer}
              setGameEnd={endGame}
              gameRunning={gameRunning}
              gameOver={gameOver}
              paragraph={paragraph}
            />
          </div>
        )}

        <div className="flex justify-center items-center">
          {gameRunning ? (
            <h2 className="font-bold text-3xl text-[#9FADC6] p-3">{timer}</h2>
          ) : (
            <button
              onClick={() => {
                gameOver ? resetGame() : startGame();
              }}
              className="rounded-[1.5rem] font-bold text-3xl text-[#394760] bg-[#9FADC6] p-3 px-6"
            >
              {gameOver ? 'New Game' : 'Start'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
