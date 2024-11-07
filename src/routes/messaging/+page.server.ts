import { query } from '../../db';
import type { Actions } from './$types';

export async function load() {
  const queryData = await query('SELECT * FROM message;');

  return { message: queryData.rows };
}

export const actions = {
  default: async ({ request }) => {
    const data = await request.formData();

    const sql_query = `INSERT INTO
    message (body, userId) VALUES ($1, $2) 
    RETURNING *;`;

    const params = [data.get('message'), 1];

    const result = await query(sql_query, params);

    return { newMessage: result.rows[0] };
  },
} satisfies Actions;
