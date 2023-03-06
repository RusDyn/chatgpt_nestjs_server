import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { OpenAIService } from '../src/openai.service';


describe('AppModule (e2e)', () => {
  let app: INestApplication;
  let server: any = null;
  let agent: request.SuperAgentTest;
  let openAiService = {
    sendMessage: async (text) => {

      return { text, id: '123' }
    }
  };

  beforeEach(async () => {

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(OpenAIService)
      .useValue(openAiService)
      .compile();

    app = moduleFixture.createNestApplication()
    await app.init();
    server = await app.listen(4000);
    // Since the application is already listening, it should use the allocated port
    agent = request.agent(server);
  });

  afterEach(async () => {
    await app.close();
    if (server) await server.close();
  });

  describe('Service OpenAI', () => {
    it('POST: /sendMessage', async () => {
      const TEST_MESSAGE = 'Hello!';

      const res = await agent
        .post(`/sendMessage`)
        .set('Content-Type', 'application/json')
        .send({
          text: TEST_MESSAGE,

        });

      expect(res.status).toBe(201)
      expect(res.body).toBeTruthy();
      expect(res.body.id).toBe('123');
      expect(res.body.text).toBe(TEST_MESSAGE);
      //console.log(res);
    });
  });
});
