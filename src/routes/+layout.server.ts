import { query } from '../db';

export async function load() {
  const people = await query('SELECT * FROM person;');

  return { users: people.rows };
}
