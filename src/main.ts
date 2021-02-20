import express from 'express';
import { connectDb } from './database';

let db: any;
async function main() {
  // Connect db
  try {
    db = await connectDb();
    console.log('Db connected');
  } catch (error) {
    console.error(error.message);
    throw new Error(error.message);
  }

  // Init express application
  const app = express();

  // Apply middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Init server
  app.listen(3000, () =>
    console.log('Server is running at http://localhost:3000/'),
  );
}

main().catch((err) => {
  console.error(err);
  db.close();
});
