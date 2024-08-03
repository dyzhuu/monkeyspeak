'use client';

import { useState, useEffect } from 'react';

import { generateRandomParagraph } from '../hooks/word_generator';
import { Game } from './game';

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

  return <>{isMounted && <Game text={text} onEsc={handleEsc} />}</>;
}
