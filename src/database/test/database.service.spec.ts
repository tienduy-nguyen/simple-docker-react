import { Database } from 'sqlite';
import { container } from 'tsyringe';
import { connectDb } from '..';
import { DatabaseService } from '../database.service';

describe('DatabaseService', () => {
  let db: Database;
  let dbService: DatabaseService;
  beforeAll(async () => {
    db = await connectDb();
    dbService = container.resolve(DatabaseService);
  });

  afterAll(async () => {
    db?.close();
  });

  it('Should be defined', () => {
    expect(dbService).toBeDefined();
  });

  it('DB instance should be defined', () => {
    expect(db).toBeDefined();
  });

  it('Db connection should be defined', () => {
    expect(dbService.getConnection).toBeDefined();
  });
});
