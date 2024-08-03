import { useState, useCallback } from 'react';

export function useAudioCapture(onData: (data: Uint8Array) => void) {
  const [stream, setStream] = useState<any>(null);
  const [isRecording, setIsRecording] = useState<any>(false);
  const [audioContext, setAudioContext] = useState<any>(null);
  const [source, setSource] = useState<any>(null);
  const [processor, setProcessor] = useState<any>(null);

  const startStream = useCallback(async () => {
    if (isRecording) return;

    try {
      // Request audio stream
      const userMediaStream = await navigator.mediaDevices.getUserMedia({
        audio: true
      });
      setStream(userMediaStream);

      // Create an audio context
      const context = new AudioContext();
      setAudioContext(context);

      // Create a media source from the user media stream
      const mediaSource = context.createMediaStreamSource(userMediaStream);
      setSource(mediaSource);

      // Create a script processor node to process the audio data
      const scriptProcessor = context.createScriptProcessor(4096, 1, 1);
      setProcessor(scriptProcessor);

      // Connect the nodes
      mediaSource.connect(scriptProcessor);
      scriptProcessor.connect(context.destination);

      // Set up the audio processing callback
      scriptProcessor.onaudioprocess = (event) => {
        const inputBuffer = event.inputBuffer.getChannelData(0); // Get the audio data from the input buffer
        const uint8Array = new Uint8Array(inputBuffer.length);

        for (let i = 0; i < inputBuffer.length; i++) {
          uint8Array[i] = Math.max(-1, Math.min(1, inputBuffer[i])) * 255; // Convert to Uint8Array
        }

        if (onData) {
          onData(uint8Array);
        }
      };

      setIsRecording(true);
    } catch (err) {
      console.error('Error starting the microphone stream:', err);
    }
  }, [isRecording, onData]);

  const stopStream = useCallback(() => {
    if (!isRecording) return;

    if (stream) {
      stream.getTracks().forEach((track: any) => track.stop());
      setStream(null);
    }

    if (audioContext) {
      audioContext.close();
      setAudioContext(null);
    }

    if (source) {
      source.disconnect();
      setSource(null);
    }

    if (processor) {
      processor.disconnect();
      setProcessor(null);
    }

    setIsRecording(false);
  }, [isRecording, stream, audioContext, source, processor]);

  return { startStream, stopStream, isRecording };
}
