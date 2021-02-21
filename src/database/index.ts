import fs from 'fs';
import { Database, open } from 'sqlite';
import sqlite3 from 'sqlite3';

/**
 * Connect database with sqlite3 & sqlite
 *
 * @return  {[db: any]} database connection
 */

let db: Database;
const connectDb = async (): Promise<Database> => {
  // Return db if already connected
  if (db) {
    return db;
  }

  // Get database path name for different environment
  let db_path: string;
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

  // Get db driver
  db = await open({
    filename: db_path,
    driver: sqlite3.Database,
  });

  // Get mutation create tables string from files
  const usersSchema = fs
    .readFileSync('src/database/sql-schemas/users.schema.sql')
    .toString();
  const userSettingsSchema = fs
    .readFileSync('src/database/sql-schemas/user-settings.schema.sql')
    .toString();

  // Init tables if not exist
  await db.run(usersSchema);
  await db.run(userSettingsSchema);

  return db;
};

export { connectDb, db };

// API
// INSERT, CREATE TABLE, UPDATE etc.
// await db.run(sqlMutation)

// // Get one item
// await db.get(sqlQuery)
// // Get several items
// await db.all(sqlQuery)
