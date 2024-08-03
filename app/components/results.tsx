
import { useState } from 'react';

export default function Results() {
    const [accuracy, setAccuracy] = useState(0);
    const [wpm, setWpm] = useState(100);
    const [time, setTime] = useState(0);

    return (
        <div className='grid grid-cols-3 p-20'>
            <div className='flex flex-col justify-center items-center'>
                <h1 className='font-bold text-2xl text-[#394760]'>Accuracy</h1>
                <p className='font-bold text-5xl text-[#9FADC6]'>{accuracy}%</p>
            </div>
            <div className='flex flex-col justify-center items-center'>
                <p className='font-bold text-7xl text-[#9FADC6]'>{wpm}</p>
                <h1 className='font-bold text-4xl text-[#394760]'>Words Per Minute</h1>
            </div>
            <div className='flex flex-col justify-center items-center'>
                <h1 className='font-bold text-2xl text-[#394760]'>Time</h1>
                <p className='font-bold text-5xl text-[#9FADC6]'>{time}s</p>
            </div>
        </div>
    )
}