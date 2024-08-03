'use client';
import { useEffect, useState } from 'react';
import { MultiplayerBars } from './multiplayerBars';
import { Game } from './game';
import { MultiplayerGame } from './multiplayer-game';

export function Multiplayer() {
  const [users, setUsers] = useState([
    { playerNumber: 1, progress: 50 },
    { playerNumber: 2, progress: 75 },
    { playerNumber: 3, progress: 100 },
    { playerNumber: 4, progress: 25 }
  ]);

  useEffect(() => {
    setInterval(() => {
      setUsers((users) =>
        users.map((user) => ({
          ...user,
          progress: 100 * Math.random()
        }))
      );
    }, 300);
  }, []);

  return (
    <div>
      <MultiplayerBars state={users} />
      <MultiplayerGame text="test" onEsc={() => {}} />
    </div>
  );
}
