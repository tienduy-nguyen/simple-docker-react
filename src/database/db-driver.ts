import { open, Database } from 'sqlite';
import sqlite3 from 'sqlite3';

/**
 * Wrote By Shine:
 * https://github.com/shinetools/back-end-exercise/blob/master/README.md
 * sqlite3 is a wrapper around SQLite
 * but doesn't provide a promise based API.
 * Therefore, we use another wrapper
 * which is sqlite which offers a Promise API around sqlite3.
 */

let db: Database;
const initDatabase = async (
  name = 'src/database/dev.db',
): Promise<Database> => {
  if (db) {
    return db;
  }
  db = await open({
    filename: name,
    driver: sqlite3.Database,
  });
  return db;
};

export { initDatabase, db };
