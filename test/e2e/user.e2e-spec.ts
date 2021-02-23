import { Database } from 'sqlite';
import { UserController } from '../../src/modules/user/user.controller';
import { AppE2EModule } from '../../src/app/app-e2e.module';
import request from 'supertest';
import { container } from 'tsyringe';
import { User } from '../../src/modules/user/user.model';

let db: Database;
let server: any;
let agent: any;

const email = 'user1@email.com';
const password = '1234567';

const userLogin = { email } as User;

describe('End to end tests: UserController', () => {
  let userController: UserController;

  beforeAll(async () => {
    const app2e2Module = new AppE2EModule();
    await app2e2Module.initServer();
    db = app2e2Module.db;
    server = app2e2Module.server;
    userController = container.resolve(UserController);
    agent = request.agent(server);
  });
  afterAll(async () => {
    server.close();
    await db?.close();
  });

  it('Should be defined', () => {
    expect(userController).toBeDefined();
  });

  describe('register', () => {
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

  describe('login', () => {
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

  describe('me', () => {
    beforeAll(async () => {
      await agent.post('/api/auth/login').send({ email, password });
    });
    it('(GET) /api/auth', async () => {
      const data = await agent.get('/api/auth').expect(200);

      expect(data.body).toMatchObject(userLogin);
    });
  });

  describe('logout', () => {
    beforeAll(async () => {
      await agent.post('/api/auth/login').send({ email, password });
    });
    it('(DELETE) /api/auth', async () => {
      const data = await agent.delete('/api/auth').expect(200);
      expect(data.body).toEqual({ logout: true });
    });
  });

  describe('UserController', () => {
    beforeAll(async () => {
      await agent.post('/api/auth/login').send({ email, password });
    });
    it('(GET) /api/users', async () => {
      const data = await agent.get('/api/users').expect(200);
      expect(Array.isArray(data.body)).toBe(true);
    });
    it('(GET) /api/users/email/:email', async () => {
      const data = await agent
        .get('/api/users/email/user1@email.com')
        .expect(200);
      expect(data.body).toMatchObject(userLogin);
      expect(data.body.email).toEqual(email);
    });

    it('(GET) /api/users/:id', async () => {
      const user: User = await db.get(
        `SELECT * FROM "users" WHERE email='${email}'`,
      );
      expect(user).toBeDefined();
      const data = await agent.get(`/api/users/${user.id}`).expect(200);
      expect(data.body).toMatchObject(userLogin);
      expect(data.body.email).toEqual(email);
    });
  });

  describe('UserSettings', () => {
    beforeAll(async () => {
      await agent.post('/api/auth/login').send({ email, password });
    });
    it('(GET) /api/user-settings', async () => {
      const data = await agent.get('/api/user-settings').expect(200);
      expect(data.body).toBeDefined();
    });
    it('(POST) /api/user-settings', async () => {
      const data = await agent
        .put('/api/user-settings')
        .send({ hasSubscribedToNewsletter: 1 })
        .expect(200);
      expect(data.body).toBeDefined();
      expect(data.body.hasSubscribedToNewsletter).toEqual(1);
    });
  });
});
