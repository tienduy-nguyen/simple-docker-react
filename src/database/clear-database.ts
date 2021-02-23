import { Database } from 'sqlite';
import { connectDb } from '../database';

let db: Database;
async function main() {
  db = await connectDb();

  // Delete old data
  await db.run(`DELETE from "users";`);

  // Create some dummy data for integrations test
  await db.run(
    `INSERT INTO "users" (email, password) VALUES('some-email-not-exists@gmail.com','1234567');`,
  );
  await db.run(
    `INSERT INTO "users" (email, password) VALUES('user1','1234567');`,
  );
  await db.run(
    `INSERT INTO "users" (email, password) VALUES('user2','1234567');`,
  );
  await db.run(
    `INSERT INTO "users" (email, password) VALUES('user3','1234567');`,
  );
}

main()
  .catch((err) => {
    console.error(err);
  })
  .finally(() => {
    db.close();
  });
