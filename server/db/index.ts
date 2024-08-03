import 'server-only';

import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

import * as schema from '@/lib/db/schema';

export const db = drizzle(postgres(process.env.POSTGRES_URL!), {
  schema
});
