'use client';

import { useState, useEffect } from 'react';

import TextBox from './textbox';
import Results from './results';
import Timer from './timer';
import MultiplayerBars from './multiplayerBars';
import Loading from './loading';

import { generateRandomParagraph } from '../hooks/word_generator';
import { speechStats, tokenize } from '@/lib/check-speech';
import { useGame } from '../hooks/useGame';

const words = require('../words.json');

export default function Main() {
  const [gameOver, setGameOver] = useState(false);
  const [gameRunning, setGameRunning] = useState(false);
  const [paragraph, setParagraph] = useState(
    generateRandomParagraph(words.sentences, 1)
  );
  const { startStreaming, stopStreaming, gameStats } = useGame(
    tokenize(paragraph)
  );

  function toggleAnimation(element: HTMLElement, animation: string) {
    element.classList.remove(animation);
    element.offsetHeight;
    element.classList.add(animation);
  }

  function resetGame() {
    setParagraph(generateRandomParagraph(words.sentences, 1));

    setGameOver(false);
  }

  function startGame() {
    startStreaming();

    setGameRunning(true);
  }

  function endGame() {
    stopStreaming();

    setGameRunning(false);
    setGameOver(true);
  }

  function handleKeyDown(event: KeyboardEvent) {
    if (event.key == 'Escape') {
      endGame();
      document.removeEventListener('keydown', handleKeyDown);
    }
  }
  useEffect(() => {
    if (gameRunning) {
      document.addEventListener('keydown', handleKeyDown);
    }
  }, [gameRunning]);

  // useEffect(() => {
  //   console.log(gameStats);
  // }, [gameStats]);

  return (
    <div className="max-w-[75rem] min-w-[50rem] m-16 justify-center content-center">
      <h1 className="font-bold text-5xl text-[#9FADC6] m-2">monkeyspeak</h1>

      <div className="w-full flex flex-col justify-center items-center gap-5">
        <div className="w-full grid">
          {gameOver ? (
            <Results />
          ) : (
            <TextBox paragraph={paragraph} gameStats={gameStats} />
          )}
        </div>

        <div className="flex justify-center items-center">
          {gameRunning ? (
            <Timer />
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
