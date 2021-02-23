import { container } from 'tsyringe';
import argon2 from 'argon2';
import { PasswordService } from '../services/password.service';

describe('PasswordService', () => {
  let passwordService: PasswordService;
  beforeEach(() => {
    passwordService = container.resolve(PasswordService);
  });
  it('Should be defined', () => {
    expect(passwordService).toBeDefined();
  });
  describe('hash', () => {
    it('Should return a string hash', async () => {
      const plain = '1234567';
      const hash = await passwordService.hash(plain);
      expect(hash).toBeDefined();
      const match = await argon2.verify(hash, plain);
      expect(match).toBe(true);
    });
  });

  describe('verify', () => {
    it('Should match password', async () => {
      const plain = '1234567';
      const hash = await argon2.hash(plain);
      const match = await passwordService.verify(hash, plain);
      expect(match).toBe(true);
    });
  });
});
