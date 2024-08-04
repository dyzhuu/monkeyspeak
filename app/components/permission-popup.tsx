'use client';

import { useEffect, useState } from 'react';
import { useMicrophonePermission } from '../hooks/useMicrophonePermission';
import RecordingButton from './microphone-access-button';

export function PermissionPopup() {
  const [isMounted, setIsMounted] = useState(false);
  const usageGranted = useMicrophonePermission();

  useEffect(() => {
    setIsMounted(true);
  });

  if (!usageGranted && isMounted)
    return (
      <div className="bg-red-500 absolute left-0 top-0 w-full h-full">
        approve microphone usage to continue
        <RecordingButton />
      </div>
    );

  return null;
}
