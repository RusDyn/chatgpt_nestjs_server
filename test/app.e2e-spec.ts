import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import * as dotenv from 'dotenv';

describe('AppModule (e2e)', () => {
  let app: INestApplication;
  let server: any = null;
  let agent: request.SuperAgentTest;

  beforeEach(async () => {
    dotenv.config();

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = await moduleFixture.createNestApplication().init();
    server = await app.listen(4000);
    // Since the application is already listening, it should use the allocated port
    agent = request.agent(server);
  });

  afterEach(async () => {
    await app.close();
    if (server) await server.close();
  });

  describe('Service OpenAI', () => {
    it('GET: /sendMessage', async () => {
      const TEST_MESSAGE = 'Hello!';

      const response = await agent
        .get(`/sendMessage?text=${TEST_MESSAGE}`)
        .expect(200);

      expect(response.text).toBeTruthy();
    });
  });
});
