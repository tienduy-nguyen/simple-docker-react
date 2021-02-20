import fs from 'fs';
import sqlite3, { Database } from 'sqlite3';

const sqlSchema = fs.readFileSync('src/database/user.schema.sql').toString();
const initTable = (db: Database) => {
  db.serialize(function () {
    db.run(sqlSchema);
  });
};

export const connectDb = () => {
  const db: Database = new sqlite3.Database('src/database/users.db');
  initTable(db);
};
