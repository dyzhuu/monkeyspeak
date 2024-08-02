import { createClient } from '@deepgram/sdk';

// STEP 1: Create a Deepgram client using the API key
export const deepgram = createClient(process.env.NEXT_PUBLIC_DEEPGRAM_API_KEY);
