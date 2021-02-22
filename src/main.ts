import 'reflect-metadata';
import { connectDb } from './database';
import { App } from './app';

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
  const app = new App();
  app.useGlobalPrefix('api');
  app.listen(5000);
}

main().catch((err) => {
  console.error(err);
  db.close();
});
