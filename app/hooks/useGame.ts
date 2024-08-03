import { Button } from '@/components/ui/button';
import { ListenLiveClient, LiveTranscriptionEvents } from '@deepgram/sdk';
import { useAudioStream } from 'react-audio-stream';
import { useEffect, useMemo, useRef, useState } from 'react';
import { checkSpeech, speechStats, tokenize } from '@/lib/check-speech';
import { deepgram } from '@/lib/deepgram';

export function useGame(text: string[]) {
  const [isStreaming, setIsStreaming] = useState(false);
  const [intervalRef, setIntervalRef] = useState<NodeJS.Timeout | null>(null);
  const [result, setResult] = useState('');
  const [ws, setWs] = useState<ListenLiveClient>();
  const [gameStats, setGameStats] = useState<speechStats>({
    currentIndex: 0,
    total: 0,
    correct: 0,
    incorrect: 0
  });
  const currentIndexRef = useRef(0);

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
          connection.keepAlive();
        }, 3000)
      );

      connection?.on(LiveTranscriptionEvents.Close, () => {
        console.log('Connection closed.');
      });

      connection?.on(LiveTranscriptionEvents.Transcript, (data) => {
        const message = data.channel.alternatives[0].transcript;

        if (currentIndexRef.current >= text.length) return;

        const stats = checkSpeech({
          baseText: text,
          speechText: message,
          currentIndex: currentIndexRef.current
        });

        currentIndexRef.current = stats.currentIndex;

        if (stats.currentIndex >= text.length) {
          setIsStreaming(false);
          connection.disconnect();
        }

        setGameStats({
          currentIndex: stats.currentIndex,
          total: stats.total,
          correct: stats.correct,
          incorrect: stats.incorrect
        });

        setResult((res) => res + ' ' + message);
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
    ws?.disconnect();
    setWs(undefined);
    setIsStreaming(false);
  }

  return {
    startStreaming,
    stopStreaming,
    isStreaming,
    result,
    gameStats
  };
}
