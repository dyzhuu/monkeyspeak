'use server';

import { db } from '@/lib/db';
import { products } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

export async function deleteProductAction(id: number) {
  console.log(id);
  await db.delete(products).where(eq(products.id, id));

  revalidatePath('/');
}
