import { Module } from '@nestjs/common';
import { OpenaiController } from './openai.controller';
import { OpenaiService } from './openai.service';
import { ConfigModule } from '@nestjs/config';
import { JsendFormatter } from 'src/common/filters/jsend-formatter';

@Module({
  imports: [ConfigModule],
  controllers: [OpenaiController],
  providers: [OpenaiService, JsendFormatter],
})
export class OpenaiModule {}
