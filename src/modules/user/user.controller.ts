import express from 'express';
import { injectable } from 'tsyringe';

@injectable()
export class UserController {
  public path = '/users';
  public router = express.Router();
}
