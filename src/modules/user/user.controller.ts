import express from 'express';
import { injectable } from 'tsyringe';
import { UserService } from './user.service';
import { Request, Response, NextFunction } from 'express';
import { NotFoundException } from 'src/common/exceptions';
import { UpdateUserDto } from './dto';
import handler from 'express-async-handler';
import { authMiddleware } from 'src/common/middlewares/auth.middleware';

@injectable()
export class UserController {
  public path = '/users';
  public router = express.Router();

  constructor(private userService: UserService) {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/`, authMiddleware(), handler(this.getUsers));
    this.router.get(
      `${this.path}/:id`,
      authMiddleware(),
      handler(this.getUser),
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
}
