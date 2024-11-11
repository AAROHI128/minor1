import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';

// Correct connection string for Neon
const sql = neon('postgresql://username:password@hostname:port/database?sslmode=require');
const db = drizzle(sql, { schema });

export { db };
        