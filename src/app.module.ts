import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { OpenAIService } from './openai.service';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ScheduleModule.forRoot()
  ],
  controllers: [
    AppController
  ],
  providers: [
    OpenAIService,
  ],
})
export class AppModule { }
