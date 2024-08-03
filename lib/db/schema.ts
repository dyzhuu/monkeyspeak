import { boolean } from 'drizzle-orm/pg-core';
import { integer, pgTable, serial, text } from 'drizzle-orm/pg-core';

export const rooms = pgTable('rooms', {
  id: text('id').primaryKey(),
  inProgress: boolean('in_progress').notNull().default(false),
  private: boolean('private').notNull().default(false)
});

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull()
});
