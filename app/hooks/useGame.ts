import { ListenLiveClient, LiveTranscriptionEvents } from '@deepgram/sdk';
import { useAudioStream } from 'react-audio-stream';
import { useEffect, useRef, useState } from 'react';
import { checkSpeech } from '@/lib/check-speech';
import { deepgram } from '@/lib/deepgram';
import { speechStats } from '@/types';

export function useGame(text: string[]) {
  const [isStreaming, setIsStreaming] = useState(false);
  const [intervalRef, setIntervalRef] = useState<NodeJS.Timeout | null>(null);
  const [result, setResult] = useState('');
  const [ws, setWs] = useState<ListenLiveClient | null>();
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

        setGameStats((prev) => ({
          currentIndex: stats.currentIndex,
          total: stats.total + prev.total,
          correct: stats.correct + prev.correct,
          incorrect: stats.incorrect + prev.incorrect
        }));

        setResult((res) => {
          return res + ' ' + message;
        });
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

  const sendBlob = (blob: Blob) => {
    // write your stream logic here.

    if (!ws) return;
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
    try {
      if (isStreaming) return;
      startStream();
      setIsStreaming(true);
    } catch (e) {
      console.log(e);
    }
  }

  async function stopStreaming() {
    stopStream();
    if (ws) {
      ws.disconnect();
      setWs(null);
    }
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
