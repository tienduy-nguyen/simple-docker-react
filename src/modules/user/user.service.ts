import { Application } from 'express';
import { SqlService } from './sql.service';

export class UserService {
  constructor(public sqlService: SqlService) {}
}
