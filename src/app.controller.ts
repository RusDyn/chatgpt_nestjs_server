import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { OpenAIService } from './openai.service';
import { SecretKeyGuard } from './secretKey.guard';

@Controller()
export class AppController {

  constructor(private aiService: OpenAIService) { }

  @Post("/sendMessage")
  @UseGuards(SecretKeyGuard)
  async getStatus(@Body() body) {

    const { text: message, conversationId } = body;


    const result = await this.aiService.sendMessage(message, conversationId);
    if (!result) {
      throw new Error("Error in result");
    }
    const { id, text } = result;
    return {
      id, text
    }
  }
}
