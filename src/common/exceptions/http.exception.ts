export class HttpException extends Error {
  public status: number;
  public message: string;

  constructor(message: string, status = 500) {
    super(message);
    this.status = status;
    this.message = message || 'Internal server error';
  }
}
