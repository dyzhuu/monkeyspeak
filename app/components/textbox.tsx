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
  const tokenizedParagraph = useMemo(() => tokenize(paragraph), [paragraph]);

  // const wordIndexes = useMemo(() => {
  //   const tempIndexes = [];
  //   for (let index = 0; index < paragraph.length; index++) {
  //     if (paragraph.charAt(index) == ' ') {
  //       tempIndexes.push(index + 1);
  //     }
  //   }
  //   return tempIndexes;
  // }, [paragraph]);

  const spokenText = tokenizedParagraph
    .slice(0, gameStats.currentIndex)
    .join(' ');

  const remainingText = tokenizedParagraph
    .slice(gameStats.currentIndex + 1, tokenizedParagraph.length)
    .join(' ');

  // function updateText() {
  //   setSpokenText(paragraph.substring(0, textIndex));
  //   setRemainingText(paragraph.substring(textIndex));
  // }

  // useEffect(() => {
  //   updateText();
  // }, [textIndex]);

  // useEffect(() => {
  //   document.addEventListener('keydown', (event) => {
  //     setTextIndex((index) => index + 1);
  //   });
  // }, []);

  return (
    <div className="h-[25vh] grow flex flex-col justify-center">
      <div className="grow overflow-y-scroll scrollbar-hide bg-transparent text-wrap text-justify text-3xl text-[#394760] p-2">
        <span>
          <mark className="bg-transparent text-white">{spokenText}</mark>
        </span>
        <span>{remainingText ? remainingText : paragraph}</span>
      </div>
    </div>
  );
}
