import { Database } from 'sqlite';
import { singleton } from 'tsyringe';
import { IDatabaseService } from './database.service.interface';
import { db } from './index';

@singleton()
export class DatabaseService implements IDatabaseService {
  private db: Database;
  constructor() {
    this.db = db;
  }

  public get getConnection(): Database {
    return this.db;
  }
}
