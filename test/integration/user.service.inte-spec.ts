import { User } from '../../src/modules/user/user.model';
import { UserService } from '../../src/modules/user/user.service';
import { UpdateUserDto } from '../../src/modules/user/dto';
import { container } from 'tsyringe';
import { Database } from 'sqlite';
import { connectDb } from '../../src/database';

describe('Integration tests: UserService', () => {
  let userService: UserService;
  let db: Database;

  const emailFake = 'some-email-exists@email.com';
  const emailDeleted = 'email-deleted@email.com';
  const oneUser = { email: emailFake } as User;

  beforeAll(async () => {
    db = await connectDb();
    userService = container.resolve(UserService);
  });

  afterAll(async () => {
    await db.close();
  });

  it('Should be defined', () => {
    expect(userService).toBeDefined();
  });

  describe('getUsers', () => {
    it('Should return an array of user', async () => {
      const result = await userService.getUsers();
      expect(result).toBeDefined();
    });
  });

  describe('getUserByEmail', () => {
    it('Should return an user', async () => {
      const user = await userService.getUserByEmail(emailFake);
      expect(user).toMatchObject(oneUser);
      expect(user.email).toEqual(emailFake);
      expect(user.password).toBeDefined();
    });
  });

  describe('getUserById', () => {
    it('Should return an user', async () => {
      const user = await db.get(
        `SELECT * FROM "users" WHERE email='${emailFake}';`,
      );
      expect(user).toBeDefined();
      const result = await userService.getUserById(user.id);
      expect(result).toEqual(user);
    });
  });

  describe('updateUserById', () => {
    it('Should return an user', async () => {
      const user = await db.get(
        `SELECT * FROM "users" WHERE email='${emailFake}';`,
      );
      expect(user).toBeDefined();
      const result = await userService.updateUserById(user.id, {
        first_name: 'changed',
      } as UpdateUserDto);
      expect(result.first_name).toEqual('changed');
    });
  });

  describe('deleteUser', () => {
    it('Should return an user', async () => {
      const user = await db.get(
        `SELECT * FROM "users" WHERE email='${emailDeleted}';`,
      );
      expect(user).toBeDefined();
      const result = await userService.deleteUser(user.id);
      expect(result).toEqual({ deleted: true });
    });
  });
});
