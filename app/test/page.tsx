'use client';

import { tokenize } from '@/lib/check-speech';
import { useGame } from '../hooks/useGame';
import { use, useEffect } from 'react';
import { Button } from '@/components/ui/button';

export default function page() {
  const { startStreaming, result } = useGame(tokenize('hello testing'));
  return (
    <div>
      <Button onClick={startStreaming}>Start</Button>
      {result}
    </div>
  );
}
