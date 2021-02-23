import 'reflect-metadata';
import { connectDb } from './database';
import { App } from './app';
import express from 'express';
import cors from 'cors';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import { sessionConfig } from './common/config/session.config';

let db: any;
export async function main() {
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

  // middleware
  app.expressApp.use(express.json());
  app.expressApp.use(express.urlencoded({ extended: true }));

  const port = 5000;
  app.expressApp.use(
    cors({
      credentials: true,
      origin: `http://localhost:${port}`,
    }),
  );

  app.expressApp.use(cookieParser());

  // Setup redis & session
  const sessionOptions = sessionConfig();
  app.expressApp.use(session(sessionOptions));

  // Bootstrap server app (initialize with controller & routing)
  app.useGlobalPrefix('api');
  app.listen(port);
}

main().catch((err) => {
  console.error(err);
  db.close();
});
