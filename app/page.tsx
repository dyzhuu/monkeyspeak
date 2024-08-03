import Main from './components/main';
import ModeBar from './components/modeBar';

export default function Home() {
  return (
    <div className="max-w-dvw min-w-dvw p-16 flex flex-col grow">
      <div className="w-full h-full flex flex-col grow">
        <h1 className="font-bold text-5xl text-[#9FADC6] m-2">monkeyspeak</h1>
        <Main />
      </div>
      <ModeBar />
    </div>
  );
}
