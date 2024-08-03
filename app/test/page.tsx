'use client';

import { Button } from '@/components/ui/button';
import { useAudioStream } from 'react-audio-stream';
import { useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client';

export default function TestPage() {
  const [isStreaming, setIsStreaming] = useState(false);
  const [intervalRef, setIntervalRef] = useState<NodeJS.Timeout | null>(null);
  const [result, setResult] = useState('');
  const [ws, setWs] = useState<Socket | null>(null);

  useEffect(() => {
    console.log('Connecting to WebSocket server...');
    const socket = io('ws://localhost:8080', {
      transports: ['websocket']
    });

    socket.on('connect', () => {
      console.log('Connected to WebSocket server');
    });

    socket.on('message', (newMessage) => {
      setResult((res) => res + ' ' + newMessage);
    });

    setWs(socket);

    return () => {
      console.log('Disconnecting from WebSocket server...');
      socket.disconnect();
      setWs(null);
    };
  }, []);

  return <div></div>;
}
