import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const checkMicrophonePermissions = () => async (dispatch: any) => {
  let retval = false;

  await navigator.mediaDevices
    .getUserMedia({ audio: true })
    .then((stream) => (retval = true))
    .catch((err) => (retval = false));

  dispatch({
    type: 'MICROPHONE_ACCESS',
    payload: retval
  });
};
