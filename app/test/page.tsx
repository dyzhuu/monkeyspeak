'use client';

import { Button } from '@/components/ui/button';
import { useAudioStream } from 'react-audio-stream';
import { useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client';

export default function TestPage() {
  const [isStreaming, setIsStreaming] = useState(false);
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

  const sendBlob = (blob: Blob) => {
    if (ws) {
      blob
        .stream()
        .getReader()
        .read()
        .then(({ value, done }) => {
          if (done) return;
          ws.emit('message', value);
        });
    }
  };

  const { startStream, stopStream } = useAudioStream(sendBlob);

  async function startStreaming() {
    startStream();
    setIsStreaming(true);
  }

  async function stopStreaming() {
    stopStream();
    setIsStreaming(false);
  }

  return (
    <div>
      <Button onClick={startStreaming} disabled={isStreaming}>
        Start Streaming
      </Button>
      <Button onClick={stopStreaming} disabled={!isStreaming}>
        Stop Streaming
      </Button>
      <p>{result}</p>
    </div>
  );
}
