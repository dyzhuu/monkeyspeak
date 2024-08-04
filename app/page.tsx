import Main from './components/main';
import ModeBar from './components/modeBar';

export default function Home() {
  return (
    <div className="w-[75rem]  p-16 flex flex-col items-center gap-24">
      <Main />

      <ModeBar />
    </div>
  );
}
