import { Database } from 'sqlite';
import { singleton } from 'tsyringe';
import { db } from './index';

@singleton()
export class DatabaseService {
  private db: Database;
  constructor() {
    this.db = db;
  }

  public get getConnection(): Database {
    return this.db;
  }
}
