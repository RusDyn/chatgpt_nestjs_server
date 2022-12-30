import { Injectable } from '@nestjs/common';
import { OpenAIService } from './openai.service';


@Injectable()
export class AppService {

  constructor(
    private aiService: OpenAIService,
  ) { }

  getHello(): string {
    return 'Hello World!';
  }
}
