import { injectable } from 'tsyringe';
import argon2 from 'argon2';

@injectable()
export class PasswordService {
  public async hash(plainText: string) {
    return await argon2.hash(plainText);
  }

  public async verify(hash: string, plain: string) {
    return await argon2.verify(hash, plain);
  }
}
