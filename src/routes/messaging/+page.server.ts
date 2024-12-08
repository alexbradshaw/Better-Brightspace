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
    message (body, userId, members) VALUES ($1, $2, $3) 
    RETURNING *;`;

    const params = [
      data.get('message'),
      data.get('userId'),
      data.get('memberList'),
    ];

    const result = await query(sql_query, params);

    return { newMessage: result.rows[0] };
  },
} satisfies Actions;
