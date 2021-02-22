import { Response, NextFunction, RequestHandler } from 'express';
import { JwtService } from 'src/modules/auth/services/jwt.service';
import { container } from 'tsyringe';
import { ForbiddenException } from '../exceptions/forbidden.exception';
import { RequestWithUser } from '../types';
import handler from 'express-async-handler';

export function authMiddleware(): RequestHandler {
  return handler(
    async (req: RequestWithUser, res: Response, next: NextFunction) => {
      try {
        if (!req.session?.accessToken) {
          throw new ForbiddenException('Unauthorized!');
        }
        const { accessToken } = req.session;
        const jwtService = container.resolve(JwtService);
        const { userId } = jwtService.verify(accessToken);

        if (!userId) {
          throw new ForbiddenException('Token invalid or missing');
        }
        req.user = { userId };
        next();
      } catch (error) {
        next(error);
      }
    },
  );
}
