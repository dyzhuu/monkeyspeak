'use client';

import { useState, useEffect, useMemo } from 'react';
import { speechStats, tokenize } from '../../lib/check-speech';
import { useGame } from '../hooks/useGame';

export default function TextBox({
  paragraph,
  gameStats
}: {
  paragraph: string;
  gameStats: speechStats;
}) {
  const [spokenText, setSpokenText] = useState('');
  const [remainingText, setRemainingText] = useState('');
  console.log(gameStats);
  const [textIndex, setTextIndex] = useState(0);
  const [wordIndexes, setWordIndexes] = useState<number[]>(setIndexes());

  function setIndexes() {
    const indexes = [0];
    for (let index = 0; index < paragraph.length; index++) {
      if (paragraph.charAt(index) == ' ') {
        indexes.push(index + 1);
      }
    }
    return indexes;
  }

  function updateText() {
    setSpokenText(paragraph.substring(0, textIndex));
    setRemainingText(paragraph.substring(textIndex));
  }

  function updateIndexes() {
    setTextIndex((index) => index + 1);
  }

  useEffect(() => {
    updateText();
  }, [textIndex]);

  useEffect(() => {
    document.removeEventListener('keydown', updateIndexes);
    document.addEventListener('keydown', updateIndexes);
  }, []);

  // const tokenizedParagraph = useMemo(() => tokenize(paragraph), [paragraph]);
  // useEffect(() => {
  //   setSpokenText(
  //     tokenizedParagraph.slice(0, gameStats.currentIndex).join(' ')
  //   );
  //   setRemainingText(
  //     tokenizedParagraph
  //       .slice(gameStats.currentIndex + 1, tokenizedParagraph.length)
  //       .join(' ')
  //   );
  // }, [gameStats]);

  return (
    <div className="h-[25vh] grow flex flex-col justify-center">
      <div className="grow overflow-y-scroll scrollbar-hide bg-transparent text-wrap text-justify text-3xl text-[#394760] p-2">
        <span>
          <mark className="bg-transparent text-white">{spokenText}</mark>
        </span>
        <span>{remainingText}</span>
      </div>
    </div>
  );
}
