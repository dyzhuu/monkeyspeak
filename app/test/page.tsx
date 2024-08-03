'use client';

import { Button } from '@/components/ui/button';
import { deepgram } from './deepgram';
import { ListenLiveClient, LiveTranscriptionEvents } from '@deepgram/sdk';
import { useAudioStream } from 'react-audio-stream';
import { useEffect, useRef, useState } from 'react';

export default function TestPage() {
  const [isStreaming, setIsStreaming] = useState(false);
  const [result, setResult] = useState('');
  const connectionRef = useRef<ListenLiveClient>(
    deepgram.listen.live({
      model: 'nova-2',
      language: 'en-US',
      smart_format: true
    })
  );

  useEffect(() => {
    // Define the event handlers
    const handleOpen = () => {
      console.log('Connection opened.');

      connectionRef.current?.on(LiveTranscriptionEvents.Close, () => {
        console.log('Connection closed.');
      });

      connectionRef.current?.on(LiveTranscriptionEvents.Transcript, (data) => {
        setResult((res) => res + ' ' + data.channel.alternatives[0].transcript);
      });

      connectionRef.current?.on(LiveTranscriptionEvents.Metadata, (data) => {
        console.log(data);
      });

      connectionRef.current?.on(LiveTranscriptionEvents.Error, (err) => {
        console.error(err);
      });
    };

    /* Initialize your WebSocket connection */
    connectionRef.current.on(LiveTranscriptionEvents.Open, handleOpen);

    // Cleanup
    return () => {
      connectionRef.current?.removeAllListeners(); // Or handle specific removals
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
        connectionRef.current?.send(value);
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
