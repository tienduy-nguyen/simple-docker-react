import { HttpException } from './http.exception';

export class BadRequestException extends HttpException {
  constructor(public message: string) {
    super(message, 400);
  }
}
