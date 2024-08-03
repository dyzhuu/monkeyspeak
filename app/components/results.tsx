import { speechStats } from '@/lib/check-speech';
import { useState } from 'react';

export default function Results({
  time,
  gameStats
}: {
  time: number;
  gameStats: speechStats;
}) {
  const accuracy = Math.round((gameStats.correct / gameStats.total) * 100);

  const wpm = Math.round((gameStats.correct / time) * 60);
  return (
    <div className="grid grid-cols-3 p-20 text-center">
      <div className="flex flex-col justify-center items-center">
        <h1 className="font-bold text-2xl text-[#394760]">Accuracy</h1>
        <p className="font-bold text-5xl text-[#9FADC6]">{accuracy}%</p>
      </div>
      <div className="flex flex-col justify-center items-center">
        <p className="font-bold text-7xl text-[#9FADC6]">{wpm}</p>
        <h1 className="font-bold text-4xl text-[#394760]">Words Per Minute</h1>
      </div>
      <div className="flex flex-col justify-center items-center">
        <h1 className="font-bold text-2xl text-[#394760]">Time</h1>
        <p className="font-bold text-5xl text-[#9FADC6]">{time}s</p>
      </div>
    </div>
  );
}
