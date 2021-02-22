import { User } from '../user.model';
import { UserService } from '../user.service';
import { IDatabaseService } from 'src/database/database.service.interface';

describe('UserService', () => {
  let userService: UserService;

  const dbServiceMock: IDatabaseService = {
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
});
