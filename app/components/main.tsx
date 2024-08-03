'use client'

import { useRef, useState } from 'react';

import TextBox from './textbox';
import Results from './results';

export default function Main() {
    const textBox = useRef<HTMLDivElement>(null);
    const [gameOver, setGameOver] = useState(false);

    function toggleAnimation() {
        const textDiv = textBox.current as HTMLDivElement;

        textDiv.classList.remove('animate-[fade_0.5s]');
        textDiv.offsetHeight;
        textDiv.classList.add('animate-[fade_0.5s]');
    }

    return (
        <div className='w-3/4 min-w-max m-16'>
            <h1 className='font-bold text-5xl text-[#9FADC6] m-2'>monkeyspeak</h1>
            
            <div className='w-full flex flex-col justify-center items-center gap-5'>
                <div ref={textBox} onAnimationEnd={() => { setGameOver(!gameOver); } } className='w-full min-h-[25vh] grid'>
                    {
                        gameOver ?
                            <Results />
                        : 
                            <TextBox />
                    }
                </div>

                <div className='w-full flex justify-center items-center '>
                    <button onClick={toggleAnimation} className='rounded-[5rem] font-bold text-2xl text-[#394760] bg-[#9FADC6] p-2 px-5'>{gameOver ? 'Restart' : 'Start'}</button>
                </div>
            </div>
        </div>
    );
}