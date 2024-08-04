'use client';
import { useState } from 'react';

export default function ModeBar({
  setTimeLimit,
  setDifficulty
}: {
  setTimeLimit: (n: number) => void;
  setDifficulty: (n: number) => void;
}) {
  const [value, setValue] = useState(0);
  const [mode, setMode] = useState('word');
  const [hardness, setHardness] = useState('Medium');
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
    <div className="min-w-[50rem] max-w-[75rem] w-full flex justify-evenly items-center *:w-[33%] *:flex *:justify-evenly *:rounded-md gap-4 whitespace-nowrap">
      <div className="bg-[#141A24]">
        <button
          onClick={() => {
            changeMove('time');
            if (value == 0) {
              setTimeLimit(30);
              changeValue(30);
            }
          }}
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
          onClick={() => {
            if (mode == 'time') {
              setTimeLimit(15);
              changeValue(15);
            } else {
              setDifficulty(0);
              setHardness('Easy');
            }
          }}
          className={`font-bold text-2xl ${(mode == 'time' && value == 15) || (mode != 'time' && hardness == 'Easy') ? 'text-[#9FADC6]' : 'text-[#394760]'} bg-[#141A24] p-2 px-5 whitespace-normal`}
        >
          {mode == 'time' ? '  15  ' : 'Easy'}
        </button>
        <button
          onClick={() => {
            if (mode == 'time') {
              setTimeLimit(30);
              changeValue(30);
            } else {
              setDifficulty(1);
              setHardness('Medium');
            }
          }}
          className={`font-bold text-2xl ${(mode == 'time' && value == 30) || (mode != 'time' && hardness == 'Medium') ? 'text-[#9FADC6]' : 'text-[#394760]'} bg-[#141A24] p-2 px-5`}
        >
          {mode == 'time' ? 30 : 'Medium'}
        </button>
        <button
          onClick={() => {
            if (mode == 'time') {
              setTimeLimit(45);
              changeValue(45);
            } else {
              setDifficulty(2);
              setHardness('Hard');
            }
          }}
          className={`font-bold text-2xl ${(mode == 'time' && value == 45) || (mode != 'time' && hardness == 'Hard') ? 'text-[#9FADC6]' : 'text-[#394760]'} bg-[#141A24] p-2 px-5`}
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
