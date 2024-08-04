'use client';
import { useAudioStreamContext } from '@/lib/contexts/audio-stream-context';

const MicrophoneAccessButton = () => {
  const { startRecording } = useAudioStreamContext();

  const handleButtonClick = () => {
    startRecording();
  };

  return (
    <button onClick={handleButtonClick} className="bg-green-500">
      request microphone access
    </button>
  );
};

export default MicrophoneAccessButton;
