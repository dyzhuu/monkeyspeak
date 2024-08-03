import ProgressBar from './progressBar';

interface MultiplayerBarsProps {
  state: Array<{ playerNumber: number; progress: number }>;
}

export function MultiplayerBars({ state }: MultiplayerBarsProps) {
  return (
    <div className="flex-col p-2 w-full">
      {state.map((user) => (
        <ProgressBar user={user} key={user.playerNumber} />
      ))}
    </div>
  );
}
