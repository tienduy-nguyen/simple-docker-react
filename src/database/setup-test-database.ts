import { Database } from 'sqlite';
import { connectDb } from '.';
import argon2 from 'argon2';

let db: Database;
async function main() {
  db = await connectDb();
  const hash = await argon2.hash('1234567');

  // Delete old data
  await db.run(`DELETE from "users";`);

  // Create some dummy data for integrations test
  await db.run(
    `INSERT INTO "users" (email, password) VALUES('some-email-exists@email.com','${hash}');`,
  );
  await db.run(
    `INSERT INTO "users" (email, password) VALUES('user1@email.com','${hash}');`,
  );
  await db.run(
    `INSERT INTO "users" (email, password) VALUES('user2@email.com','${hash}');`,
  );
  await db.run(
    `INSERT INTO "users" (email, password) VALUES('user3@email.com','${hash}');`,
  );
  await db.run(
    `INSERT INTO "users" (email, password) VALUES('email-deleted@email.com','${hash}');`,
  );

  const userIds: { id: number | string }[] = await db.all(
    `SELECT id from "users"`,
  );
  for (let userWithId of userIds) {
    await db.run(
      `INSERT INTO "user_settings" ("userId") VALUES (${userWithId.id});`,
    );
  }
}

main()
  .catch((err) => {
    console.error(err);
  })
  .finally(() => {
    db.close();
  });
