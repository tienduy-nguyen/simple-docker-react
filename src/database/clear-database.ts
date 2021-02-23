import { Database } from 'sqlite';
import { connectDb } from '../database';

let db: Database;
async function main() {
  db = await connectDb();

  // Delete old data
  await db.run(`DELETE from "users";`);

  const emailFake = 'some-email-not-exists@gmail.com';
  const passwordFake = '1234567';
  const mutation = `INSERT INTO "users" (email, password) VALUES(?,?);`;
  const values = [emailFake, passwordFake];

  await db.run(mutation, values);
}

main()
  .catch((err) => {
    console.error(err);
  })
  .finally(() => {
    db.close();
  });
