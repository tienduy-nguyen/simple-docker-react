import fs from 'fs';
import sqlite3, { Database } from 'sqlite3';

const usersSchema = fs.readFileSync('src/database/users.schema.sql').toString();
const userSettingsSchema = fs
  .readFileSync('src/database/user-settings.schema.sql')
  .toString();
const initTable = (db: Database) => {
  db.serialize(function () {
    db.run(usersSchema);
    db.run(userSettingsSchema);
  });
};

export const connectDb = () => {
  let db_path: string;
  switch (process.env.NODE_ENV) {
    case 'development':
      db_path = 'src/database/dev.db';
      break;
    case 'production':
      db_path = 'src/database/prod.db';
      break;
    case 'test':
      db_path = 'src/database/test';
      break;
    default:
      db_path = 'src/database/dev.db';
      break;
  }
  const db: Database = new sqlite3.Database(db_path);
  initTable(db);
};
