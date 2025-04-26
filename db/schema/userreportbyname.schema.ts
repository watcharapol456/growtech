import { pgView, integer, text } from 'drizzle-orm/pg-core';

export const userreportView = pgView('userreport_view', {
  id: integer('id'),
  description: text('description'),
  name: text('name'),
}).existing();
  