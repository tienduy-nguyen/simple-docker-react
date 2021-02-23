import { BadRequestException, ConflictException } from 'src/common/exceptions';
import { User } from 'src/modules/user/user.model';
import { AuthService } from '../services/auth.service';

const email = 'some-email@gmail.com';
const password = 'some-password';
const oneUser = { email, password } as User;

describe('AuthService', () => {
  let authService: AuthService;

  const mockUserService: any = {
    getUserByEmail: jest.fn(),
  };

  const mockPasswordService: any = {
    hash: jest.fn(),
    verify: jest.fn(),
  };

  const mockDbService: any = {
    getConnection: {
      run: jest.fn(),
      get: jest.fn(),
    },
  };

  beforeAll(() => {
    authService = new AuthService(
      mockUserService,
      mockPasswordService,
      mockDbService,
    );
  });

  it('Should be defined', () => {
    expect(authService).toBeDefined();
  });

  describe('loginUser', () => {
    it('Should login successfully', async () => {
      mockUserService.getUserByEmail.mockReturnValue(oneUser);
      mockPasswordService.verify.mockReturnValue(true);
      const result = await authService.loginUser({ email, password });
      expect(result).toMatchObject(oneUser);
    });

    it('Should throw error when invalid credentials', async () => {
      mockUserService.getUserByEmail.mockReturnValue(null);
      try {
        await authService.loginUser({ email, password });
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
      }
    });

    it('Should throw error when password not match', async () => {
      mockUserService.getUserByEmail.mockReturnValue(oneUser);
      mockPasswordService.verify.mockReturnValue(false);
      try {
        await authService.loginUser({ email, password });
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
      }
    });
  });

  describe('registerUser', () => {
    it('Should register user successfully', async () => {
      mockPasswordService.hash.mockReturnValue('some hash password');
      mockDbService.getConnection.run.mockReturnValue({});
      mockDbService.getConnection.get.mockReturnValue(oneUser);
      mockUserService.getUserByEmail.mockReturnValue(null);
      const result = await authService.registerUser({ email, password });
      expect(result).toMatchObject(oneUser);
    });

    it('Should throw error when conflict email register', async () => {
      mockUserService.getUserByEmail.mockReturnValue(oneUser);
      try {
        await authService.registerUser({ email, password });
      } catch (error) {
        expect(error).toBeInstanceOf(ConflictException);
      }
    });
  });
});
