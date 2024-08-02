'use client'

import { useState } from 'react';

import TextBox from './textbox';
import Results from './results';

export default function Main() {
    const [gameOver, setGameOver] = useState(false);

    return (
        <div className='w-3/4'>
            <div className='w-full flex flex-col justify-center items-center rounded-lg bg-gray-200 p-5'>
                <div className='w-full min-h-[35vh] grid'>
                    {
                        gameOver ?
                            <Results />
                        : 
                            <TextBox />
                    }
                </div>

                <div className='w-full flex justify-center items-center bg-gray-200 mt-5 '>
                    <button onClick={() => { setGameOver(!gameOver); }} className='rounded-md font-bold text-white bg-gray-400 p-2'>{gameOver ? 'Restart' : 'Start'}</button>
                </div>
            </div>
        </div>
    );
}