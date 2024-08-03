'use client';

import { Button } from '@/components/ui/button';
import { deepgram } from './deepgram';
import { ListenLiveClient, LiveTranscriptionEvents } from '@deepgram/sdk';
import { useAudioStream } from 'react-audio-stream';
import { useEffect, useRef, useState } from 'react';

export default function TestPage() {
  const [isStreaming, setIsStreaming] = useState(false);
  const [intervalRef, setIntervalRef] = useState<NodeJS.Timeout | null>(null);
  const [result, setResult] = useState('');
  const [ws, setWs] = useState<ListenLiveClient>();

  useEffect(() => {
    const connection = deepgram.listen.live({
      model: 'nova-2-general',
      language: 'en-US',
      smart_format: false,
      no_delay: true
    });

    setWs(connection);

    // Define the event handlers
    const handleOpen = () => {
      console.log('Connection opened.');

      setIntervalRef(
        setInterval(() => {
          const keepAliveMsg = JSON.stringify({ type: 'KeepAlive' });
          connection.send(keepAliveMsg);
          console.log('Sent KeepAlive message');
        }, 3000)
      );

      connection?.on(LiveTranscriptionEvents.Close, () => {
        console.log('Connection closed.');
      });

      connection?.on(LiveTranscriptionEvents.Transcript, (data) => {
        setResult((res) => res + ' ' + data.channel.alternatives[0].transcript);
      });

      connection?.on(LiveTranscriptionEvents.Metadata, (data) => {
        console.log(data);
      });

      connection?.on(LiveTranscriptionEvents.Error, (err) => {
        console.error(err);
      });
    };

    /* Initialize your WebSocket connection */
    connection.on(LiveTranscriptionEvents.Open, handleOpen);

    // Cleanup
    return () => {
      connection.removeAllListeners(); // Or handle specific removals
      setWs(undefined);
    };
  }, []);

  useEffect(() => {}, []);

  const sendBlob = (blob: Blob) => {
    // write your stream logic here.
    blob
      .stream()
      .getReader()
      .read()
      .then(({ value, done }) => {
        if (done) {
          return;
        }
        ws?.send(value);
      });
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
