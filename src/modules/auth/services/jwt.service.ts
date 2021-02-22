import { injectable } from 'tsyringe';
import jwt from 'jsonwebtoken';
import { BadRequestException } from 'src/common/exceptions';
import { DataStoredFromToken, PayloadToken } from 'src/common/types';

@injectable()
export class JwtService {
  private jwtSecret = 'some_strong_secret_better_add_it_in_env_file';

  public sign(payload: PayloadToken) {
    const token = jwt.sign(payload, this.jwtSecret, {
      expiresIn: 60 * 60 * 2, // 2h
    });
    return { token };
  }

  public verify(token: string): DataStoredFromToken {
    try {
      const decoded = jwt.verify(token, this.jwtSecret);
      return decoded as DataStoredFromToken;
    } catch (error) {
      throw new BadRequestException('Token invalid or missing');
    }
  }
}
