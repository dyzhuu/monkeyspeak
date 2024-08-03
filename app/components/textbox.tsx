'use client';

import { useRef, useState } from 'react';

export default function TextBox() {
    const spokenRef = useRef<HTMLSpanElement>(null);
    const textBoxRef = useRef<HTMLDivElement>(null);
    const [spokenText, setSpokenText] = useState('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ');
    const [remainingText, setRemainingText] = useState(
        'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    );

    function hi() {
        const spokenDiv = spokenRef.current as HTMLSpanElement;
        const textBox = textBoxRef.current as HTMLDivElement;

        if (spokenDiv.clientHeight > textBox.clientHeight / 2) {
            console.log(spokenDiv.clientHeight);
            console.log(textBox.clientHeight);
        }
    }

    return (
        <div className='max-h-[25vh] grow flex flex-col justify-center'>
            <div ref={textBoxRef} className='grow overflow-y-scroll bg-transparent text-wrap text-justify text-3xl text-[#394760] p-2'>
                <span ref={spokenRef} className='text-red-600'>{spokenText}</span>
                <span>{remainingText}</span>
            </div>
        </div>
    );
}
