import session from 'express-session';
// import Redis from 'ioredis';
// import connectRedis from 'connect-redis';

export const SESSION_AUTH = 'SESSION_AUTH';

export function sessionConfig(): session.SessionOptions {
  // If use redis as connect store
  // By default is in-memory store
  // const redisClient = new Redis();
  // const RedisStore = connectRedis(session);

  return {
    // store: new RedisStore({
    //   client: redisClient as any,
    // }),
    name: SESSION_AUTH,
    secret: 'some_strong_secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days --> need >= max of alive time of refresh token
    },
  };
}
