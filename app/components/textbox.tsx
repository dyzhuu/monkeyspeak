'use client';

import { useState, useEffect, useMemo } from 'react';
import { speechStats, tokenize } from '../../lib/check-speech';

export default function TextBox({
  paragraph,
  gameStats
}: {
  paragraph: string;
  gameStats: speechStats;
}) {
  const [spokenText, setSpokenText] = useState('');
  const [remainingText, setRemainingText] = useState('');

  const tokenizedText = useMemo(() => tokenize(paragraph), [paragraph]);

  useEffect(() => {
    setSpokenText(
      tokenize(paragraph).slice(0, gameStats.currentIndex).join(' ')
    );
    setRemainingText(
      tokenizedText
        .slice(gameStats.currentIndex, tokenizedText.length + 1)
        .join(' ')
    );
  }, [gameStats]);

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
        </span>{' '}
        <span>{remainingText}</span>
      </div>
    </div>
  );
}
