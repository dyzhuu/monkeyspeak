'use client';
import { useEffect, useState } from 'react';
import { MultiplayerBars } from './multiplayerBars';
import { MultiplayerGame } from './multiplayer-game';
import { io, Socket } from 'socket.io-client';
import { Player } from '@/types';
import { Button } from '@/components/ui/button';
import { tokenize } from '@/lib/check-speech';
import Loading from './loading';

enum GameState {
  BEGINNING,
  LOBBY,
  GAME,
  RESULT
}

export function Multiplayer() {
  const [ws, setWs] = useState<Socket | null>(null);
  const [roomCode, setRoomCode] = useState<string>('');
  const [players, setPlayers] = useState<Map<string, Player>>(new Map());

  const [multiplayerBarsState, setMultiplayerBarsState] = useState<
    Array<{ playerNumber: number; progress: number }>
  >([]);

  const [state, setState] = useState<GameState>(GameState.BEGINNING);
  const [text, setText] = useState<string>('');

  useEffect(() => {
    console.log('Connecting to WebSocket server...');
    const socket = io(`${process.env.NEXT_PUBLIC_WEBSOCKET_URL}/game`, {
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

    socket.on('startGame', (data) => {
      console.log(data);
      setText(data.text);
      setState(GameState.GAME);
    });

    socket.on('playerDisconnect', (data) => {
      console.log(data);
      setPlayers((prev) => {
        const newPlayers = new Map(prev);
        newPlayers.delete(data.userId);
        return newPlayers;
      });
    });

    socket.on('speakUpdate', ({ userId, currentIndex }) => {
      setPlayers((prev) => {
        const newPlayers = new Map(prev);
        newPlayers.set(userId, {
          id: userId,
          currentIndex
        });

        return newPlayers;
      });
    });

    socket.on('finished', ({ userId }) => {
      setPlayers((prev) => {
        const newPlayers = new Map(prev);
        newPlayers.set(userId, {
          id: userId,
          currentIndex: text.length
        });

        return newPlayers;
      });
    });

    setWs(socket);

    return () => {
      console.log('Disconnecting from WebSocket server...');
      socket.disconnect();
      setWs(null);
    };
  }, []);

  useEffect(() => {
    const state = Array.from(players.values()).map((player, index) => ({
      playerNumber: index + 1,
      progress: Math.round(
        ((player.currentIndex ?? 0) * 100) / tokenize(text).length
      )
    }));
    console.log(state);
    setMultiplayerBarsState(state);
  }, [players]);

  async function handleJoinLobby() {
    ws?.emit('joinRoom', roomCode);
    setState(GameState.LOBBY);
  }

  async function handleStartGame() {
    ws?.emit('startGame', roomCode);
  }

  async function handleStatsChange(currentIndex: number) {
    setPlayers((prev) => {
      const newPlayers = prev;
      if (!ws) return new Map();

      newPlayers.set(ws.id!, {
        id: ws.id!,
        currentIndex
      });

      return newPlayers;
    });
    ws?.emit('speakUpdate', { roomId: roomCode, currentIndex });
    if (currentIndex >= text.length) {
      ws?.emit('finished', { roomId: roomCode });
    }
  }

  if (state === GameState.BEGINNING) {
    return (
      <div className="w-full h-full flex justify-center items-center grow">
        <Button onClick={handleJoinLobby}>Join Lobby</Button>
      </div>
    );
  }

  if (state === GameState.LOBBY) {
    return (
      <div className="w-full h-full flex flex-col gap-10 justify-center items-center grow text-white">
        {players.size === 0 ? (
          <Loading />
        ) : (
          <>
            <div>
              <h2>Players:</h2>
              <div>
                {Array.from(players.values()).map((player) => (
                  <p key={player.id}>{player.id}</p>
                ))}
              </div>
            </div>
            <Button onClick={handleStartGame}>Start Game</Button>
          </>
        )}
      </div>
    );
  }

  if (state === GameState.GAME) {
    return (
      <>
        <MultiplayerBars state={multiplayerBarsState} />
        <MultiplayerGame text={text} onStatsChange={handleStatsChange} />
      </>
    );
  }

  return (
    <div>
      <Button />
      {/* <MultiplayerBars state={users} /> */}
      {/* <MultiplayerGame text="test" onEsc={() => {}} /> */}
    </div>
  );
}
