import { Injectable, Logger } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import { OpenAIApi } from "openai";
import { executablePath } from 'puppeteer';

export const importDynamic = new Function('modulePath', 'return import(modulePath)');


@Injectable()
export class OpenAIService {

    gptApi: any;
    openAI: OpenAIApi;
    private readonly logger = new Logger(OpenAIService.name);

    constructor() { }

    async onModuleInit() {
        await this.initGPT();
    }
    async initGPT() {
        const { ChatGPTAPIBrowser } = await importDynamic('chatgpt');
        //const browser = await this.puppeteerService.getBrowser();
        if (!process.env.OPENAI_EMAIL || !process.env.OPENAI_PASSWORD) {
            throw new Error("OPENAI_EMAIL, OPENAI_PASSWORD missing");
        }

        try {
            this.logger.log('Creating ChatCPT Browser')
            const api = new ChatGPTAPIBrowser({
                email: process.env.OPENAI_EMAIL,
                password: process.env.OPENAI_PASSWORD,
                markdown: process.env.CHATGPT_MARKDOWN || false,
                minimize: process.env.CHATGPT_MINIMIZE || false,
                executablePath: executablePath(),
                isGoogleLogin: process.env.CHATGPT_GOOGLELOGIN || true,
                captchaToken: process.env.CAPTCHA_TOKEN

            })
            this.logger.log('Initing session for ChatGPT Browser')
            await api.initSession()
            this.logger.log('Sending test message');
            const result = await api.sendMessage('Hello World!')
            console.log(result.response)
            this.gptApi = api;
        }
        catch (e) {
            console.log(e);
        }

    }
    async sendMessage(message: string, conversationId: string | undefined, parentMessageId: string | undefined): Promise<string> {

        this.logger.log(`Send Message ${message}`)
        let response: string | undefined;
        if (!conversationId) {
            response = await this.gptApi.sendMessage(message, {
                timeoutMs: 2 * 60 * 1000
            });
        }
        else {
            response = await this.gptApi.sendMessage(message, {
                conversationId,
                parentMessageId,
                timeoutMs: 2 * 60 * 1000
            })
        }
        return response ?? "";
    }

    @Cron(CronExpression.EVERY_HOUR)
    async handleCron() {
        this.logger.debug('Refresh called every 1 hour');
        if (this.gptApi) {
            await this.gptApi.refreshSession();
        }
    }
}