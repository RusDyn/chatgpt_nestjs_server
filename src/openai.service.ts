import { Injectable, Logger } from "@nestjs/common";
import { delay } from "rxjs";

export const importDynamic = new Function('modulePath', 'return import(modulePath)');


@Injectable()
export class OpenAIService {

    gptApi: any;

    private readonly logger = new Logger(OpenAIService.name);

    constructor() { }

    async onModuleInit() {
        await this.initGPT();
    }
    async initGPT() {
        const { ChatGPTAPI } = await importDynamic('chatgpt');

        if (!process.env.OPENAI_API_KEY) {
            throw new Error("OPENAI_API_KEY missing");
        }

        try {
            this.logger.log('Creating ChatGPT Api')
            this.gptApi = new ChatGPTAPI({
                apiKey: process.env.OPENAI_API_KEY
            })

            this.logger.log('Sending test message');

            const result = await this.sendMessage('Hello World!')
            console.log(`${result?.text} from ${result?.id}`);

        }
        catch (e) {
            console.log(e);
        }

    }
    async sendMessage(message: string, parentMessageId?: string) {

        if (!message || message.length === 0) {
            throw new Error("Message is empty");
        }

        let tries = 5;
        while (tries > 0) {
            try {
                const res: {
                    parentMessageId?: string | undefined,
                    role?: string | undefined,
                    id?: string | undefined,
                    text?: string | undefined,
                } = await this.gptApi.sendMessage(message, {
                    parentMessageId,

                })
                return res;
            } catch (e) {

                console.log(e);
                this.logger.error(e);
                await delay(10000);
            }
        }
    }
}
