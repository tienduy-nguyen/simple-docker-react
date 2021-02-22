import { injectable } from 'tsyringe';
import Redis from 'ioredis';

@injectable()
export class RedisService {
  private _redis: Redis.Redis;
  constructor() {
    this._redis = new Redis();
  }

  public get redis() {
    return this._redis;
  }
}
