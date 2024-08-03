'use client';

import { useState, useEffect } from 'react';

export default function Timer() {
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    const timerInterval = setInterval(() => {
      setTimer((prevTimer) => prevTimer + 1);
    }, 1000);

    return () => {
      clearInterval(timerInterval);
    };
  }, []);

  return (
    <h2 className="rounded-[5rem] font-bold text-4xl text-[#9FADC6]">
      {timer}
    </h2>
  );
}
