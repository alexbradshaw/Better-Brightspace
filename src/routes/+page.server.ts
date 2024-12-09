import { query } from '../db';
import type { Actions } from './$types';

const size = ['Bytes', 'KB', 'MB', 'TB'];

export async function load() {
  const queryData = await query('SELECT * FROM resource;');

  return { resources: queryData.rows };
}

export const actions = {
  create: async ({ request }) => {
    const data = await request.formData();

    const sql_query = `INSERT INTO
    resource (resource, type, size) VALUES ($1, $2, $3) 
    RETURNING *;`;

    const random = () => {
      const num = Math.random() * 800;
      const identifier = Math.floor(Math.random() * 3);

      return num.toFixed(2).toString() + ' ' + size[identifier];
    };

    const params = [data.get('resource'), data.get('type'), random()];

    const result = await query(sql_query, params);

    return { newResource: result.rows[0] };
  },
  delete: async ({ request }) => {
    const data = await request.formData();

    const sql_query = `DELETE FROM resource WHERE id = $1`;

    const params = [data.get('id')];

    const result = await query(sql_query, params);

    return { deleteSuccess: result.rowCount != 0 };
  },
} satisfies Actions;
