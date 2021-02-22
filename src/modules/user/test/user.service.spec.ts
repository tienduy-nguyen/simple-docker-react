// import { container as globalContainer, DependencyContainer } from 'tsyringe';
import { DatabaseService } from 'src/database/database.service';
import { User } from '../user.model';
import { UserService } from '../user.service';
import { mocked } from 'ts-jest/utils';

const mockGetConnection = {
  all: jest.fn(),
  run: jest.fn(),
  get: jest.fn(),
  close: jest.fn(),
};
jest.mock('src/database/database.service', () => ({
  DatabaseService: jest.fn().mockImplementation(() => {
    return {
      getConnection: mockGetConnection,
    };
  }),
}));

describe('UserService', () => {
  let userService: UserService;
  let dbServiceMock: any;
  // let container: DependencyContainer;

  const oneUser = { id: 1 } as User;
  dbServiceMock = mocked(DatabaseService as any, true);

  beforeEach(async () => {
    // container = globalContainer.createChildContainer();
    dbServiceMock.mockClear();

    userService = new UserService(dbServiceMock);
  });
  it('Should be defined', () => {
    expect(userService).toBeDefined();
  });

  describe('getUsers', () => {
    it('Should return an array of user', async () => {
      mockGetConnection.all.mockReturnValue([oneUser]);
      const result = await userService.getUsers();
      expect(result).toBeInstanceOf(Array);
    });
  });
});
