import { AppController } from './app.controller';
import { OpenAIService } from './openai.service';

describe('CatsController', () => {
    let appController: AppController;
    let openai: OpenAIService;

    beforeEach(() => {
        openai = new OpenAIService();
        appController = new AppController(openai);
    });

    describe('sendMessage', () => {
        it('should return an message', async () => {
            const text = 'Hello World!';
            const result = { text };
            jest.spyOn(openai, 'sendMessage').mockImplementation(async () => (result));

            expect(await appController.sendMessage({
                text: 'Hello World!'
            })).toBe(result);
        });
    });
});