import { HttpException } from './http.exception';

export class ConflictException extends HttpException {
  constructor(public message: string) {
    super(message, 409);
  }
}
