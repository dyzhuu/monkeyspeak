import Main from './components/main';
import ModeBar from './components/modeBar';

export default function Home() {
  return (
    <div className="max-w-dvw min-w-dvw p-16 flex flex-col justify-center gap-24">
      <Main />

      <ModeBar />
    </div>
  );
}
