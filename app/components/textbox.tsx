'use client';

import { useState, useEffect } from 'react';
import { tokenize } from '../../lib/check-speech';

export default function TextBox({ paragraph } : { paragraph: string }) {
    const [textIndex, setTextIndex] = useState(0);
    const [spokenText, setSpokenText] = useState('');
    const [remainingText, setRemainingText] = useState('');

    const [wordIndexes, setWordIndexes] = useState<number[]>([]);

    function updateText() {
      setSpokenText(paragraph.substring(0, textIndex));
      setRemainingText(paragraph.substring(textIndex));
    }

    useEffect(() => {
      updateText();
    }, [textIndex]);

    useEffect(() => {
      document.addEventListener('keydown', (event) => {
        setTextIndex((index) =>  index + 1);
      });
    }, [])

    return (
        <div className='h-[25vh] grow flex flex-col justify-center'>
            <div className='grow overflow-y-scroll scrollbar-hide bg-transparent text-wrap text-justify text-3xl text-[#394760] p-2'>
                <span><mark className='bg-transparent text-white'>{spokenText}</mark></span>
                <span>{remainingText ? remainingText : paragraph}</span>
            </div>
        </div>
    );
}
