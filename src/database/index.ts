import fs from 'fs';
import { initDatabase } from './db-driver';

/**
 * Connect database with sqlite3 & sqlite
 *
 * @return  {[db: any]} database connection
 */
export const connectDb = async () => {
  let db_path: string;

  // Get database path name for different environment
  switch (process.env.NODE_ENV) {
    case 'development':
      db_path = 'src/database/dev.db';
      break;
    case 'production':
      db_path = 'src/database/prod.db';
      break;
    case 'test':
      db_path = 'src/database/test.db';
      break;
    default:
      db_path = 'src/database/dev.db';
      break;
  }

  // Get mutation create tables string from files
  const usersSchema = fs
    .readFileSync('src/database/sql-schemas/users.schema.sql')
    .toString();
  const userSettingsSchema = fs
    .readFileSync('src/database/sql-schemas/user-settings.schema.sql')
    .toString();

  // Get db driver
  const db = await initDatabase(db_path);

  // Init tables if not exist
  await db.run(usersSchema);
  await db.run(userSettingsSchema);

  return db;
};

// API
// INSERT, CREATE TABLE, UPDATE etc.
// await db.run(sqlMutation)

// // Get one item
// await db.get(sqlQuery)
// // Get several items
// await db.all(sqlQuery)
