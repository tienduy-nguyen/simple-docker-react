import { injectable } from 'tsyringe';
import argon2 from 'argon2';
import { HttpException } from 'src/common/exceptions';

@injectable()
export class PasswordService {
  public async hash(plainText: string) {
    return await argon2.hash(plainText);
  }

  public async verify(hash: string, plain: string) {
    try {
      return await argon2.verify(hash, plain);
    } catch (error) {
      throw new HttpException('Error format of hash password');
    }
  }
}
