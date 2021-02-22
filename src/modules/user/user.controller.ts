import express from 'express';
import { injectable } from 'tsyringe';
import { UserService } from './user.service';
import { Request, Response, NextFunction } from 'express';
import { NotFoundException } from 'src/common/exceptions';
import { CreateUserDto, UpdateUserDto } from './dto';
@injectable()
export class UserController {
  public path = '/users';
  public router = express.Router();

  constructor(private userService: UserService) {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/`, this.getUsers);
    this.router.get(`${this.path}/:id`, this.getUser);
    this.router.post(`${this.path}`, this.createUser);
    this.router.put(`${this.path}/:id`, this.updateUser);
    this.router.delete(`${this.path}/:id`, this.deleteUser);
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

  private createUser = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const data: CreateUserDto = req.body;
      const user = await this.userService.createUser(data);
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
