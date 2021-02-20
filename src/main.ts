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
  app.listen(3000);
}

main().catch((err) => {
  console.error(err);
  db.close();
});
