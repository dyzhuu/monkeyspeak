export const dynamic = 'force-dynamic';

import Link from 'next/link';
import { Multiplayer } from '../components/multiplayer';

export default function MultiplayerPage() {
  return (
    <div className="max-w-dvw min-w-dvw p-16 flex flex-col grow">
      <div className="w-full h-full flex flex-col grow">
        <Link href="./">
          <h1 className="font-bold text-5xl text-[#9FADC6] m-2">monkeyspeak</h1>
        </Link>
        <Multiplayer />
      </div>
    </div>
  );
}
