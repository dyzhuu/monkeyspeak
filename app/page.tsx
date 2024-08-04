import Link from 'next/link';
import Main from './components/main';

export default function Home() {
  return (
    <div className="w-[75vw] max-w-[75rem] p-16 flex flex-col items-center">
      <Main />
    </div>
  );
}
