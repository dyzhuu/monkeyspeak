import { waveform } from 'ldrs';

waveform.register();

export default function Loading() {
  return (
    <div>
      <l-waveform
        size="100"
        stroke="3.5"
        speed="1"
        color="#9FADC6"
      ></l-waveform>
    </div>
  );
}
