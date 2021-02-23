import { Database } from 'sqlite';
import { connectDb } from '../../src/database';
import { container } from 'tsyringe';
import { AuthService } from '../../src/modules/auth/services/auth.service';
import {
  BadRequestException,
  ConflictException,
} from '../../src/common/exceptions';

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
    await db?.close();
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

  describe('registerUser', () => {
    it('Should register successfully', async () => {
      const newEmail = 'new-email-not-exists@email.com';
      const user = await authService.registerUser({
        email: newEmail,
        password,
      });
      expect(user).toBeDefined();
      // Delete user after testing successfully
      await db.run(`DELETE FROM "users" WHERE email='${newEmail}'`);
    });

    it('Should register failed when register with email already exists', async () => {
      const newEmail = 'some-email-exists@email.com';
      try {
        await authService.registerUser({
          email: newEmail,
          password,
        });
      } catch (error) {
        expect(error).toBeInstanceOf(ConflictException);
      }
    });
  });
});
