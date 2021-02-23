import { container } from 'tsyringe';
import { JwtService } from '../services/jwt.service';
import { PayloadToken } from 'src/common/types';

describe('JwtService', () => {
  let jwtService: JwtService;
  beforeEach(() => {
    jwtService = container.resolve(JwtService);
  });
  it('Should be defined', () => {
    expect(jwtService).toBeDefined();
  });
  describe('sign', () => {
    it('Should return a string token', async () => {
      const payload: PayloadToken = { userId: 1 };
      const { token } = jwtService.sign(payload);
      expect(token).toBeDefined();
      expect(typeof token).toBe('string');
    });
  });

  describe('verify', () => {
    it('Should return data from token', async () => {
      const payload: PayloadToken = { userId: 1 };
      const { token } = await jwtService.sign(payload);
      const { userId } = jwtService.verify(token);
      expect(userId).toEqual(payload.userId);
    });
  });
});
