import { Database } from 'sqlite';
import { connectDb } from '../../src/database';
import { container } from 'tsyringe';
import { AuthService } from '../../src/modules/auth/services/auth.service';

let db: Database;
describe('Integration tests: AuthService', () => {
  let authService: AuthService;

  beforeAll(async () => {
    db = await connectDb();
    authService = container.resolve(AuthService);
  });

  afterAll(async () => {
    db?.close();
  });

  it('Should be defined', () => {
    expect(authService).toBeDefined();
  });

  describe('loginUser', () => {
    it('Should login successfully', async () => {});
  });
});
