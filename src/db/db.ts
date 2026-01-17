import type { QueryResult, QueryResultRow } from 'pg';
import { Pool } from 'pg';

import { env } from '../configs/env';

const pool = new Pool({
  host: env.DB_HOST,
  port: env.DB_PORT,
  database: env.DB_NAME,
  user: env.DB_USER,
  password: env.DB_PASSWORD,
});

export async function query<T extends QueryResultRow = QueryResultRow>(
  text: string,
  params?: unknown[],
): Promise<QueryResult<T>> {
  const result = await pool.query<T>(text, params);
  return result;
}

export async function assertDatabaseConnection() {
  try {
    await pool.query('SELECT 1;');
    console.log('Connected to postgres');
  } catch (error) {
    console.error('Failed to connect database');
    throw error;
  }
}
