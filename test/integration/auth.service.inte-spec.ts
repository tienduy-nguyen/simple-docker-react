import { Database } from 'sqlite';
import { connectDb } from '../../src/database';
import { container } from 'tsyringe';
import { AuthService } from '../../src/modules/auth/services/auth.service';
import { BadRequestException } from '../../src/common/exceptions';

let db: Database;
const email = 'user1@email.com';
const password = '1234567';
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
    it('Should login successfully', async () => {
      const user = await authService.loginUser({ email, password });
      expect(user).toBeDefined();
    });
    it('Should login failed with email not exists', async () => {
      try {
        await authService.loginUser({
          email: 'not-exists@email.com',
          password,
        });
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
      }
    });

    it('Should login failed with password not match', async () => {
      try {
        await authService.loginUser({ email, password: 'bad-password' });
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
      }
    });
  });
});
