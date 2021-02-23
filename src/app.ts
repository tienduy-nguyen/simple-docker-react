import 'src/app/app.container';
import express, { Application } from 'express';
import { container } from 'tsyringe';
import { AppController } from './app/app.controller';
import { errorMiddleware } from './common/middlewares';
import { HttpController } from './common/types/http.types';
import { Server } from 'node:http';
import http from 'http';

export class App {
  private _controllers = [] as HttpController[];
  private _app: Application;
  private _port = 3000;
  private _globalPrefix = '';
  private _server: Server;

  constructor() {
    this._app = express();
  }

  public get expressApp() {
    return this._app;
  }

  public get expressServer() {
    return this._server || http.createServer(this._app);
  }

  public useGlobalPrefix(prefix: string) {
    this._globalPrefix = '/' + prefix;
  }

  public listen(port: number, alert = true) {
    this._port = port;
    this.bootstrapServer();
    this._server = this._app.listen(this._port, () => {
      if (alert) {
        console.log(`Server is running at http://localhost:${this._port}/`);
      }
    });
  }
  public close() {
    this._server.close();
  }

  /* Private methods */
  private async bootstrapServer() {
    // We can also init middleware here
    // eg:
    // this._app.use(express.json());
    // this._app.use(express.urlencoded({ extended: true }));
    // ...-> use cors, helmet, cookie parser ....

    // Bootstrap all controller routing of project
    this.initControllers();

    // Always keep handle error in the end
    this._app.use(errorMiddleware);
  }

  private initControllers() {
    this._app.get('/', (req, res) => {
      res.status(200).send('Hi there!');
    });

    // Check health
    this._app.get('/healthz', (req, res) => {
      res.status(200).end();
    });
    this._app.get('/status', (req, res) => {
      res.status(200).end();
    });

    // Get all controller registered from app controller
    const appControllers = container.resolve(AppController);
    this._controllers = appControllers.all;

    this._controllers.forEach((c) => {
      this._app.use(this._globalPrefix, c.router);
    });
  }
}
