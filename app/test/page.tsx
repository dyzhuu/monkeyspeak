'use client';

import { tokenize } from '@/lib/check-speech';
import { useGame } from '../hooks/useGame';
import { use, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Player } from '@/types';
import { useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client';

export default function TestPage() {
  const [ws, setWs] = useState<Socket | null>(null);
  const [roomCode, setRoomCode] = useState<string>('');
  const [players, setPlayers] = useState<Map<string, Player>>(new Map());

  useEffect(() => {
    console.log('Connecting to WebSocket server...');
    const socket = io('ws://localhost:8080/game', {
      transports: ['websocket']
    });

    socket.on('connect', () => {
      console.log('Connected to WebSocket server');
    });

    socket.on('joinedLobby', ({ roomId, playerIds }) => {
      setRoomCode(roomId);
      console.log(playerIds);
      playerIds.forEach((userId: string) => {
        setPlayers((prev) => new Map([...prev, [userId, { id: userId }]]));
      });
    });

    socket.on('newUser', (data) => {
      console.log(data);
      setPlayers(
        (prev) => new Map([...prev, [data.userId, { id: data.userId }]])
      );
    });

    socket.on('playerDisconnect', (data) => {
      console.log(data);
      setPlayers((prev) => {
        const newPlayers = new Map(prev);
        newPlayers.delete(data.userId);
        return newPlayers;
      });
    });

    socket.on('speakUpdate', (data) => {
      console.log(data);
    });

    setWs(socket);

    return () => {
      console.log('Disconnecting from WebSocket server...');
      socket.disconnect();
      setWs(null);
    };
  }, []);

  async function handleJoinRoom() {
    ws?.emit('joinRoom', roomCode);
  }

  return (
    <div>
      <input
        onChange={(e) => setRoomCode(e.currentTarget.value)}
        value={roomCode}
      />
      <Button onClick={handleJoinRoom}>join room</Button>
      <Button
        onClick={() =>
          ws?.emit('speakUpdate', { roomId: roomCode, currentIndex: 5 })
        }
      >
        speak update
      </Button>

      <div>
        {Array.from(players.values()).map((player) => (
          <p key={player.id}>{player.id}</p>
        ))}
      </div>
    </div>
  );
}
