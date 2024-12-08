import { query } from '../../db';

export async function load() {
  const people = await query('SELECT * FROM person;');
  const templates = await query('SELECT * FROM template;');

  return { people: people.rows, templates: templates.rows };
}
