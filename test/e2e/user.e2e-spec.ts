import { Database } from 'sqlite';
import { UserController } from '../../src/modules/user/user.controller';
import { AppE2EModule } from '../../src/app/app-e2e.module';
import request from 'supertest';
import { container } from 'tsyringe';

let db: Database;
let server: any;
const email = 'user1@email.com';
const password = '1234567';

describe('End to end tests: UserController', () => {
  let userController: UserController;

  beforeAll(async () => {
    const app2e2Module = new AppE2EModule();
    await app2e2Module.initServer();
    db = app2e2Module.db;
    server = app2e2Module.server;
    userController = container.resolve(UserController);
  });
  afterAll(async () => {
    server.close();
    await db?.close();
  });

  it('Should be defined', () => {
    expect(userController).toBeDefined();
  });

  describe('Login', () => {
    it('(POST) /api/auth/login', async () => {
      const data = await request(server)
        .post('/api/auth/login')
        .send({ email, password })
        .expect(200);
      expect(data.body).toBeDefined();
      const { token } = data.body;
      expect(typeof token).toBe('string');
    });
  });

  describe('Register', () => {
    it('(POST) /api/auth/register', async () => {
      const data = await request(server)
        .post('/api/auth/register')
        .send({ email: 'some-email-not-exists@email.com', password })
        .expect(200);
      expect(data.body).toBeDefined();
      const { token } = data.body;
      expect(typeof token).toBe('string');
    });
  });
});
