import { integer, pgTable, serial, text } from 'drizzle-orm/pg-core';

export const rooms = pgTable('products', {
  id: serial('id').primaryKey(),
  capacity: integer('capacity').notNull()
});

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull(),
  password: text('password').notNull()
});
