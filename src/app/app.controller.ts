import './app.container';
import { HttpController } from 'src/common/types/http.types';
import { UserController } from 'src/modules/user/user.controller';
import { container, injectable } from 'tsyringe';

@injectable()
export class AppController {
  private _appControllers: HttpController[] = [];

  constructor() {
    this._getAllController();
  }
  public get all(): HttpController[] {
    return this._appControllers;
  }

  private _getAllController() {
    const userController = container.resolve(UserController);

    this._appControllers.push(userController);
  }
}
