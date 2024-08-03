'use client';
import { useState } from 'react';

export default function ModeBar() {
  const [mode, setMode] = useState('word');
  const [value, setValue] = useState(30);
  const [player, setPlayer] = useState('single');

  function changeMove(mode: string) {
    setMode(mode);
  }

  function changeValue(n: number) {
    setValue(n);
  }

  function changePlayer(player: string) {
    setPlayer(player);
  }

  return (
    <div className="w-full flex justify-evenly items-center *:w-[33%] *:flex *:justify-evenly *:rounded-md gap-4 whitespace-nowrap">
      <div className="bg-[#141A24]">
        <button
          onClick={() => changeMove('time')}
          className={`font-bold text-2xl ${mode == 'time' ? 'text-[#9FADC6]' : 'text-[#394760]'} bg-[#141A24] p-2 px-5`}
        >
          Time
        </button>
        <button
          onClick={() => changeMove('word')}
          className={`font-bold text-2xl ${mode == 'word' ? 'text-[#9FADC6]' : 'text-[#394760]'} bg-[#141A24] p-2 px-5`}
        >
          Word
        </button>
      </div>
      <div className="bg-[#141A24]">
        <button
          onClick={() => changeValue(15)}
          className={`font-bold text-2xl ${value == 15 ? 'text-[#9FADC6]' : 'text-[#394760]'} bg-[#141A24] p-2 px-5 whitespace-normal`}
        >
          {mode == 'time' ? '  15  ' : 'Easy'}
        </button>
        <button
          onClick={() => changeValue(30)}
          className={`font-bold text-2xl ${value == 30 ? 'text-[#9FADC6]' : 'text-[#394760]'} bg-[#141A24] p-2 px-5`}
        >
          {mode == 'time' ? 30 : 'Medium'}
        </button>
        <button
          onClick={() => changeValue(45)}
          className={`font-bold text-2xl ${value == 45 ? 'text-[#9FADC6]' : 'text-[#394760]'} bg-[#141A24] p-2 px-5`}
        >
          {mode == 'time' ? 45 : 'Hard'}
        </button>
      </div>
      <div className=" bg-[#141A24]">
        <button
          onClick={() => changePlayer('single')}
          className={`font-bold text-2xl ${player == 'single' ? 'text-[#9FADC6]' : 'text-[#394760]'} bg-[#141A24] p-2 px-5`}
        >
          Single Player
        </button>
        <button
          onClick={() => changePlayer('multi')}
          className={`font-bold text-2xl ${player == 'multi' ? 'text-[#9FADC6]' : 'text-[#394760]'} bg-[#141A24] p-2 px-5`}
        >
          Multiplayer
        </button>
      </div>
    </div>
  );
}
