import express from 'express';
import { App } from 'src/app';
import { sessionConfig } from 'src/common/config/session.config';
import session from 'express-session';
import { Database } from 'sqlite';
import { connectDb } from 'src/database';

export class AppE2EModule {
  private _server: any;
  private _db: Database;

  public get server() {
    return this._server;
  }
  public get db() {
    return this._db;
  }

  public async initServer(): Promise<void> {
    this._db = await connectDb();
    const app = new App();
    // middleware
    app.expressApp.use(express.json());
    app.expressApp.use(express.urlencoded({ extended: true }));

    const port = 5221;
    // Setup redis & session
    const sessionOptions = sessionConfig();
    app.expressApp.use(session(sessionOptions));

    // Bootstrap server app (initialize with controller & routing)
    app.useGlobalPrefix('api');
    app.listen(port);
    this._server = app.expressServer;
  }
}
