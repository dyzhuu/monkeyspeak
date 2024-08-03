'use client';

import { useState, useEffect } from 'react';

import TextBox from './textbox';
import Results from './results';
import Timer from './timer';
import MultiplayerBars from './multiplayerBars';
import Loading from './loading';

import { generateRandomParagraph } from '../hooks/word_generator';
import { statsCalculator } from '@/lib/statsCalculator';
import { tokenize } from '@/lib/check-speech';
import { useGame } from '../hooks/useGame';

import words from '../words.json';

export default function Main() {
  const [gameOver, setGameOver] = useState(false);
  const [gameRunning, setGameRunning] = useState(false);
  const [paragraph, setParagraph] = useState(
    generateRandomParagraph(words.sentences, 1)
  );

  const [accuracy, setAccuracy] = useState(0);
  const [wpm, setWpm] = useState(0);
  const [timer, setTimer] = useState(0);

  const { startStreaming, stopStreaming, gameStats } = useGame(
    tokenize(paragraph)
  );

  function toggleAnimation(element: HTMLElement, animation: string) {
    element.classList.remove(animation);
    element.offsetHeight;
    element.classList.add(animation);
  }

  function resetGame() {
    // setParagraph(generateRandomParagraph(words.sentences, 1));

    // setGameOver(false);
    window.location.reload();
  }

  function startGame() {
    startStreaming();

    setTimer(0);

    setGameRunning(true);
  }

  function endGame() {
    stopStreaming();

    const { accuracy, wordsPerMinute } = statsCalculator(
      gameStats.currentIndex,
      gameStats.total,
      gameStats.correct,
      gameStats.incorrect,
      timer
    );
    setAccuracy(accuracy);
    setWpm(wordsPerMinute);

    setGameRunning(false);
    setGameOver(true);
  }

  useEffect(() => {
    console.log(gameStats);
    if (gameStats.currentIndex == tokenize(paragraph).length) {
      endGame();
    }
  }, [gameStats]);

  useEffect(() => {
    if (gameRunning) {
      const timerInterval = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
      }, 1000);

      return () => {
        clearInterval(timerInterval);
      };
    }
  }, [gameRunning]);

  return (
    <div className="max-w-[75rem] min-w-[50rem] m-16 justify-center content-center">
      <h1 className="font-bold text-5xl text-[#9FADC6] m-2">monkeyspeak</h1>

      <div className="w-full flex flex-col justify-center items-center gap-5">
        <div className="w-full grid">
          {gameOver ? (
            <Results accuracy={accuracy} wpm={wpm} time={timer} />
          ) : (
            <TextBox paragraph={paragraph} gameStats={gameStats} />
          )}
        </div>

        <div className="flex justify-center items-center">
          {gameRunning ? (
            <h2 className="rounded-[5rem] font-bold text-4xl text-[#9FADC6]">
              {timer}
            </h2>
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
