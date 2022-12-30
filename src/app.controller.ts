import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { OpenAIService } from './openai.service';

@Controller()
export class AppController {

  constructor(
    private aiService: OpenAIService,
    private readonly appService: AppService
  ) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get("/sendMessage")
  getStatus(@Query("text") text, @Query("conversationId") conversationId, @Query("messageId") messageId) {
    return this.aiService.sendMessage(text, conversationId, messageId);
  }
}
