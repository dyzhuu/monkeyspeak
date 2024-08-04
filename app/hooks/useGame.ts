import { ListenLiveClient, LiveTranscriptionEvents } from '@deepgram/sdk';
import { useEffect, useRef, useState } from 'react';
import { checkSpeech, speechStats } from '@/lib/check-speech';
import { deepgram } from '@/lib/deepgram';
import { useAudioStreamContext } from '@/lib/contexts/audio-stream-context';

export function useGame(text: string[]) {
  const [isStreaming, setIsStreaming] = useState(false);
  const [intervalRef, setIntervalRef] = useState<NodeJS.Timeout | null>(null);
  const [result, setResult] = useState('');
  const wsRef = useRef<ListenLiveClient | null>();
  const [gameStats, setGameStats] = useState<speechStats>({
    currentIndex: 0,
    total: 0,
    correct: 0,
    incorrect: 0
  });
  const currentIndexRef = useRef(0);
  const { subscribe } = useAudioStreamContext();

  useEffect(() => {
    const connection = deepgram.listen.live({
      model: 'nova-2-general',
      language: 'en-US',
      smart_format: false,
      no_delay: true
    });

    wsRef.current = connection;

    // Define the event handlers
    const handleOpen = () => {
      console.log('connection opened');
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
      wsRef.current = undefined;
    };
  }, []);

  useEffect(() => {
    const unsubscribe = subscribe((stream) => {
      console.log('usegame', stream, wsRef.current);
      if (!wsRef.current) return;
      wsRef.current.send(stream);
    });

    return () => {
      unsubscribe();
    };
  }, [subscribe]);

  return {
    isStreaming,
    result,
    gameStats
  };
}
