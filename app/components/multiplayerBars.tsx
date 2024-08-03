import ProgressBar from './progressBar';

export default function multiplayerBars() {
  const users = [
    { playerNumber: 1, progress: 50 },
    { playerNumber: 2, progress: 75 },
    { playerNumber: 3, progress: 100 },
    { playerNumber: 4, progress: 25 }
  ];

  return (
    <div className="flex-col p-2 w-full">
      {users.map((user) => (
        <ProgressBar user={user} key={user.playerNumber} />
      ))}
    </div>
  );
}
