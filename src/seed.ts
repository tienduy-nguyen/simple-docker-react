import { connectDb } from 'src/database';
import faker from 'faker';
import { User } from './modules/user/user.model';
import { Database } from 'sqlite';
import argon2 from 'argon2';

let db: Database;
async function main() {
  console.log(
    'Start seeding .................................................',
  );
  db = await connectDb();
  // Delete old data
  await db.run(`DELETE from "users";`);

  // Create dummy users
  const password = await argon2.hash('1234567');
  for (let i = 0; i < 20; ++i) {
    const email = faker.internet.email();
    const first_name = faker.name.firstName();
    const last_name = faker.name.lastName();
    const birthdate = faker.date.past().toISOString();
    const city = faker.address.city();
    const street = faker.address.streetName();
    const country = faker.address.country();
    const zip = faker.address.zipCode();
    const status = 'ACTIVE';

    const userTemp = new User({
      email,
      password,
      first_name,
      last_name,
      birthdate,
      street,
      city,
      country,
      zip,
    });

    const mutation = `
    INSERT INTO "users" (email, password, first_name, last_name, 
                        full_name, birthdate, street, 
                        city, country, zip, status, 
                        createdAt, updatedAt)

                VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?);
    `;
    const values = [
      email,
      password,
      first_name,
      last_name,
      userTemp.full_name,
      birthdate,
      street,
      city,
      country,
      zip,
      status,
      userTemp.createdAt,
      userTemp.updatedAt,
    ];

    await db.run(mutation, values);
  }
  console.log(
    'End seeding....................................................',
  );
}

main()
  .catch((err) => {
    console.error(err);
  })
  .finally(() => {
    db.close();
  });
