import express, { Application } from 'express';
import { errorMiddleware } from './common/middlewares';
// import { HttpController } from './common/types/http.types';

export class App {
  // private _controllers = [] as HttpController[];
  private _app: Application;
  private _port = 3000;
  // private _globalPrefix = '';

  constructor() {
    this._app = express() as Application;
  }

  public get expressApp() {
    return this._app;
  }

  // public useGlobalPrefix(prefix: string) {
  //   this._globalPrefix = '/' + prefix;
  // }

  public listen(port: number, alert = true) {
    this._port = port;
    this.bootstrapServer();
    this._app.listen(this._port, () => {
      if (alert) {
        console.log(`Server is running at http://localhost:${this._port}/`);
      }
    });
  }

  /* Private methods */
  private async bootstrapServer() {
    // Init middleware
    this._app.use(express.json());
    this._app.use(express.urlencoded({ extended: true }));
    // ...-> use cors, helmet, cookie parser ....

    this.initControllers();

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

    // // Get all controller registered from app controller
    // const appControllers = container.resolve(AppController);
    // this._controllers = appControllers.all;

    // this._controllers.forEach((c) => {
    //   this.app.use(this.globalPrefix, c.router);
    // });
  }
}
