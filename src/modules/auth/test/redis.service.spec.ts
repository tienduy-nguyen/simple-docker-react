import { container } from 'tsyringe';
import { RedisService } from '../services/redis.service';

describe('RedisService', () => {
  let redisService: RedisService;
  beforeAll(() => {
    redisService = container.resolve(RedisService);
  });

  afterAll(async () => {
    redisService.redis.disconnect();
  });

  it('Should be defined', () => {
    expect(redisService).toBeDefined();
  });
  it('Redis client should be defined', () => {
    expect(redisService.redis).toBeDefined();
  });
});
