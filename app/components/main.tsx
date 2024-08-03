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
import { Button } from '@/components/ui/button';
import { Game } from './game';
import { useAudioStream } from 'react-audio-stream';

const words = require('../words.json');

export default function Main() {
  const [isMounted, setIsMounted] = useState(false);
  const [text, setText] = useState(generateRandomParagraph());

  useEffect(() => {
    setIsMounted(true);
  });

  function handleEsc() {
    setIsMounted(false);
    setText(generateRandomParagraph());
    setTimeout(() => setIsMounted(true), 0);
  }

  return (
    <div className="max-w-[75rem] min-w-[50rem] m-16 justify-center content-center">
      <h1 className="font-bold text-5xl text-[#9FADC6] m-2">monkeyspeak</h1>

      <div className="w-full flex flex-col justify-center items-center gap-5">
        {isMounted && <Game text={text} onEsc={handleEsc} />}
      </div>
    </div>
  );
}
