import express from 'express';
import { injectable } from 'tsyringe';
import { Request, Response, NextFunction } from 'express';
import {
  BadRequestException,
  HttpException,
  NotFoundException,
} from 'src/common/exceptions';
import { LoginUserDto, RegisterUserDto } from '../auth/dto';
import { AuthService } from './services/auth.service';
import { UserService } from '../user/user.service';
import { JwtService } from './services/jwt.service';
import { PayloadToken, RequestWithUser } from 'src/common/types';
import { SESSION_AUTH } from 'src/common/config/session.config';
import { User } from '../user/user.model';
import handler from 'express-async-handler';
@injectable()
export class UserController {
  public path = '/users';
  public router = express.Router();

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private jwtService: JwtService,
  ) {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, handler(this.me));
    this.router.post(`${this.path}`, handler(this.login));
    this.router.post(`${this.path}/register`, handler(this.register));
    this.router.delete(`${this.path}`, handler(this.logout));
  }

  /* Private method for controller */

  private me = async (req: Request, res: Response, next: NextFunction) => {
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
  private login = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const data: LoginUserDto = req.body;
      const user = await this.authService.loginUser(data);
      // if user null --> auto throw error (catch error already in authService)
      const { token } = this.updateSession(user, req);
      res.json({ token });
    } catch (error) {
      next(error);
    }
  };

  private register = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const data: RegisterUserDto = req.body;
      const user = await this.authService.registerUser(data);

      // Update auth token in session
      const { token } = this.updateSession(user, req);
      res.json({ token });
    } catch (error) {
      next(error);
    }
  };

  private logout = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      req.res?.clearCookie(SESSION_AUTH);
      await req.session!.destroy();
      return { logout: true };
    } catch (error) {
      console.error(error);
      return { logout: false };
    }
  };

  /* Helper methods */
  private updateSession(user: User, req: RequestWithUser): { token: string } {
    if (!user) {
      throw new BadRequestException('User not authenticated');
    }
    const payload: PayloadToken = {
      userId: user.id,
    };
    const { token } = this.jwtService.sign(payload);

    // Update token in session
    req.session.accessToken = token;
    return { token };
  }
}
