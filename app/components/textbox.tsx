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

  const [textIndex, setTextIndex] = useState(0);

  const wordIndexes = setIndexes();

  function setIndexes() {
    const indexes = [0];
    for (let index = 0; index < paragraph.length; index++) {
      if (paragraph.charAt(index) == ' ') {
        indexes.push(index + 1);
      }
    }
    indexes.push(paragraph.length);
    return indexes;
  }

  function updateText() {
    setSpokenText(paragraph.substring(0, textIndex));
    if (textIndex == paragraph.length) {
      setRemainingText('');
    } else {
      setRemainingText(paragraph.substring(textIndex));
    }
  }

  useEffect(() => {
    updateText();
  }, [textIndex]);

  useEffect(() => {
    setTextIndex(wordIndexes[gameStats.currentIndex]);
  }, [gameStats]);

  // function updateIndexes() {
  //   setTextIndex((index) => index + 1);
  // }
  // useEffect(() => {
  //   document.removeEventListener('keydown', updateIndexes);
  //   document.addEventListener('keydown', updateIndexes);
  // }, []);

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
