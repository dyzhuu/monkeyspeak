'use client';
import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
  ReactNode
} from 'react';
import { useAudioStream } from 'react-audio-stream';

type AudioStreamContextType = {
  audioStream: Uint8Array | null;
  isRecording: boolean;
  startRecording: () => void;
  stopRecording: () => void;
  subscribe: (subscriber: (stream: Uint8Array) => void) => () => void;
};

const AudioStreamContext = createContext<AudioStreamContextType | undefined>(
  undefined
);

export const useAudioStreamContext = (): AudioStreamContextType => {
  const context = useContext(AudioStreamContext);
  if (!context) {
    throw new Error(
      'useAudioStreamContext must be used within an AudioStreamProvider'
    );
  }
  return context;
};

type AudioStreamProviderProps = {
  children: ReactNode;
};

export const AudioStreamProvider = ({ children }: AudioStreamProviderProps) => {
  const [audioStream, setAudioStream] = useState<Uint8Array | null>(null);
  const subscribersRef = useRef<Array<(stream: Uint8Array) => void>>([]);
  const [isRecording, setIsRecording] = useState(false);
  const { startStream, stopStream } = useAudioStream(async (blob) => {
    const { value: stream } = await blob.stream().getReader().read();

    if (!stream) return;

    setAudioStream(stream);
    notifySubscribers(stream);
  });

  const notifySubscribers = (stream: Uint8Array) => {
    subscribersRef.current.forEach((subscriber) => subscriber(stream));
  };

  const subscribe = useCallback((subscriber: (stream: Uint8Array) => void) => {
    subscribersRef.current.push(subscriber);
    return () => {
      subscribersRef.current = subscribersRef.current.filter(
        (sub) => sub !== subscriber
      );
    };
  }, []);

  const startRecording = useCallback(() => {
    if (isRecording) return;
    startStream();
    setIsRecording(true);
  }, [startStream]);

  const stopRecording = useCallback(() => {
    stopStream();
    setIsRecording(false);
  }, [stopStream]);

  return (
    <AudioStreamContext.Provider
      value={{
        audioStream,
        startRecording,
        stopRecording,
        subscribe,
        isRecording
      }}
    >
      {children}
    </AudioStreamContext.Provider>
  );
};
