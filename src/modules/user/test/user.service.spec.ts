import { User } from '../user.model';
import { UserService } from '../user.service';
import { UpdateUserDto } from '../dto';

describe('UserService', () => {
  let userService: UserService;

  const dbServiceMock: any = {
    getConnection: {
      all: jest.fn(),
      run: jest.fn(),
      get: jest.fn(),
      close: jest.fn(),
    },
  };

  const oneUser = { id: 1 } as User;
  beforeEach(async () => {
    userService = new UserService(dbServiceMock);
  });
  it('Should be defined', () => {
    expect(userService).toBeDefined();
  });

  describe('getUsers', () => {
    it('Should return an array of user', async () => {
      dbServiceMock.getConnection.all.mockReturnValue([oneUser]);
      const result = await userService.getUsers();
      expect(result).toBeInstanceOf(Array);
    });
  });

  describe('getUserByEmail', () => {
    it('Should return an user', async () => {
      dbServiceMock.getConnection.get.mockReturnValue(oneUser);
      const result = await userService.getUserByEmail('some email');
      expect(result).toEqual(oneUser);
    });
  });

  describe('getUserById', () => {
    it('Should return an user', async () => {
      dbServiceMock.getConnection.get.mockReturnValue(oneUser);
      const result = await userService.getUserById(1);
      expect(result).toEqual(oneUser);
    });
  });

  describe('updateUserById', () => {
    it('Should return an user', async () => {
      dbServiceMock.getConnection.run.mockReturnValue({});
      const result = await userService.updateUserById(1, {
        email: 'some email',
      } as UpdateUserDto);
      expect(result).toMatchObject(oneUser);
    });
  });

  describe('deleteUser', () => {
    it('Should return an user', async () => {
      dbServiceMock.getConnection.run.mockReturnValue({});
      const result = await userService.deleteUser(1);
      expect(result).toEqual({ deleted: true });
    });
  });
});
