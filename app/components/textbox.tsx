'use client';

import { useMemo } from 'react';

interface TextBoxProps {
  tokenizedText: string[];
  currentIndex: number;
}

export default function TextBox({ tokenizedText, currentIndex }: TextBoxProps) {
  const spokenText = useMemo(
    () => tokenizedText.slice(0, currentIndex).join(' '),
    [tokenizedText]
  );

  const remainingText = useMemo(
    () => tokenizedText.slice(currentIndex, tokenizedText.length + 1).join(' '),
    [tokenizedText]
  );

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
    <div className="max-h-[25vh] grow flex flex-col justify-center">
      <div className="grow overflow-y-scroll scrollbar-hide bg-transparent text-wrap text-justify text-3xl text-[#394760] p-2">
        <span>
          <mark className="bg-transparent text-white">{spokenText}</mark>
        </span>{' '}
        <span>{remainingText}</span>
      </div>
    </div>
  );
}
