import { Database } from 'sqlite';
import { connectDb } from './database';

let db: Database;
async function main() {
  db = await connectDb();

  // Delete old data
  // await db.run(`DELETE from "users";`);

  // Add column password to database
  await db.run(`ALTER TABLE "users"
  ADD COLUMN password TEXT NOT NULL;`);
  console.log('Add column password successfully');
}

main()
  .catch((err) => {
    console.error(err);
  })
  .finally(() => {
    db.close();
  });
