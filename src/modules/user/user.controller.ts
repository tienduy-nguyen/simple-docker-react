import express from 'express';
import { injectable } from 'tsyringe';
import { UserService } from './user.service';
import { Request, Response, NextFunction } from 'express';
import { NotFoundException } from 'src/common/exceptions';
import { UpdateUserDto } from './dto';
import handler from 'express-async-handler';
import { authMiddleware } from 'src/common/middlewares/auth.middleware';
import { UserSettingsService } from '../user-settings/user-settings.service';
import { RequestWithUser } from 'src/common/types';
import { UpdateUserSettingsDto } from '../user-settings/dto/update-user-settings.dto';

@injectable()
export class UserController {
  public path = '/users';
  public router = express.Router();

  constructor(
    private userService: UserService,
    private userSettingsService: UserSettingsService,
  ) {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/`, authMiddleware(), handler(this.getUsers));
    this.router.get(
      `${this.path}/:id`,
      authMiddleware(),
      handler(this.getUser),
    );
    this.router.get(
      `${this.path}/email/:email`,
      authMiddleware(),
      handler(this.getUserByEmail),
    );
    this.router.put(
      `${this.path}/:id`,
      authMiddleware(),
      handler(this.updateUser),
    );
    this.router.delete(
      `${this.path}/:id`,
      authMiddleware(),
      handler(this.deleteUser),
    );

    this.router.get(
      `/user-settings`,
      authMiddleware(),
      handler(this.getUserUserSettings),
    );
    this.router.put(
      `/user-settings`,
      authMiddleware(),
      handler(this.updateUserSettings),
    );
  }

  /* Private method for controller */

  private getUsers = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      res.json(await this.userService.getUsers());
    } catch (error) {
      next(error);
    }
  };
  private getUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const user = await this.userService.getUserById(id);
      if (!user) {
        throw new NotFoundException('User not found');
      }
      res.json(user);
    } catch (error) {
      next(error);
    }
  };
  private getUserByEmail = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { email } = req.params;
      const user = await this.userService.getUserByEmail(email);
      if (!user) {
        throw new NotFoundException('User not found');
      }
      res.json(user);
    } catch (error) {
      next(error);
    }
  };

  private updateUser = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const id: string = req.params.id;
      const data: UpdateUserDto = req.body;
      const user = await this.userService.updateUserById(id, data);
      res.json(user);
    } catch (error) {
      next(error);
    }
  };

  private deleteUser = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const id = req.params.id;
      await this.userService.deleteUser(id);
      res.json({ deleted: true });
    } catch (error) {
      next(error);
    }
  };

  private getUserUserSettings = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { userId } = req.user;
      const userSettings = await this.userSettingsService.getUserSettings(
        userId,
      );
      res.json(userSettings);
    } catch (error) {
      next(error);
    }
  };

  private updateUserSettings = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { userId } = req.user;
      const data: UpdateUserSettingsDto = req.body;
      const userSettings = await this.userSettingsService.updateUserSettings(
        userId,
        data,
      );
      res.json(userSettings);
    } catch (error) {
      next(error);
    }
  };
}
