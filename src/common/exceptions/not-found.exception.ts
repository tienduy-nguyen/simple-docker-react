import { HttpException } from './http.exception';

export class NotFoundException extends HttpException {
  constructor(public message: string) {
    super(message, 404);
  }
}
