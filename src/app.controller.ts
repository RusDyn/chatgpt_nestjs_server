import { Controller, Get, Query } from '@nestjs/common';
import { OpenAIService } from './openai.service';

@Controller()
export class AppController {

  constructor(private aiService: OpenAIService) { }

  @Get("/sendMessage")
  getStatus(@Query("text") text, @Query("conversationId") conversationId, @Query("messageId") messageId) {
    return this.aiService.sendMessage(text, conversationId, messageId);
  }
}
