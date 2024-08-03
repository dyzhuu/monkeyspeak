'use client'

import { useRef, useState, useEffect } from 'react';

import TextBox from './textbox';
import Results from './results';
import MultiplayerBars from './multiplayerBars';

export default function Main() {
    const textBox = useRef<HTMLDivElement>(null);
    const [timerInterval, setTimerInterval] = useState<NodeJS.Timeout>();
    const [gameOver, setGameOver] = useState(false);
    const [gameRunning, setGameRunning] = useState(false);
    const [timer, setTimer] = useState(0);

    function toggleAnimation(element: HTMLElement, animation: string) {
        element.classList.remove(animation);
        element.offsetHeight;
        element.classList.add(animation);
    }

    function startGame() {
        setTimer(0);
        
        setGameRunning(true);
        setGameOver(false);
    }

    function endGame() {
        setGameRunning(false);
    }

    function handleKeyDown(event: KeyboardEvent) {
        if (event.key == 'Escape' && gameRunning) {
            toggleAnimation(textBox.current as HTMLDivElement, 'animate-[fade_0.5s]');

            endGame();

            document.removeEventListener('keydown', handleKeyDown);
        }
    }

    useEffect(() => {
        if (gameRunning) {
            document.addEventListener('keydown', handleKeyDown);

            setTimerInterval(
                setInterval(() => {
                    setTimer((prevTimer) => prevTimer + 1);
                }, 1000)
            );
        }

        return () => {
            clearInterval(timerInterval);
        };
    }, [gameRunning]);

    return (
    <div className="max-w-[75rem] min-w-[50rem] w-full flex flex-col self-center content-center justify-center grow">
      <h1 className="font-bold text-5xl text-[#9FADC6] mb-4">monkeyspeak</h1>
            <div className="flex w-full">
                <MultiplayerBars />
            </div>
            <div className='w-full flex flex-col justify-center items-center gap-5'>
                <div ref={textBox} onAnimationEndCapture={() => { setGameOver(!gameOver); }} className='w-full grid'>
                    {
                        gameOver ?
                            <Results />
                        : 
                            <TextBox />
                    }
                </div>

                <div className="flex justify-center items-center">
                    {
                        gameRunning ?
                            <h2 className='rounded-[5rem] font-bold text-4xl text-[#9FADC6]'>{timer}</h2>
                        : <button onClick={() => { gameOver ? toggleAnimation(textBox.current as HTMLDivElement, 'animate-[fade_0.5s]') : startGame(); }} className="w-[16.25rem] h-[6rem] rounded-[1.5rem] font-bold text-3xl text-[#394760] bg-[#9FADC6] p-2 px-5">{gameOver ? 'New Game' : 'Start'}</button>
                    }
                </div>
            </div>
        </div>
    );
}
