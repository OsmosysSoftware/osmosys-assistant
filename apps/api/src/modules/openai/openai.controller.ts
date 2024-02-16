import { Body, Controller, Post, Get, Param, UseGuards } from '@nestjs/common';
import { OpenaiService } from './openai.service';
import { SendMessageDto } from './dto/sendMessage.dto';
import { AuthGuard } from '../auth/guards/auth.guard';
import { JsendFormatter } from 'src/common/filters/jsend-formatter';

@Controller('openai')
@UseGuards(AuthGuard)
export class OpenaiController {
  constructor(
    private openaiService: OpenaiService,
    private jsend: JsendFormatter,
  ) {}

  @Post('message')
  async createMessage(@Body() messageBody: SendMessageDto): Promise<Record<string, unknown>> {
    const data = await this.openaiService.sendMessage(messageBody);
    return this.jsend.success(data);
  }

  @Get('thread/:threadId')
  async getThreadById(@Param('threadId') threadId: string): Promise<Record<string, unknown>> {
    const data = await this.openaiService.getThreadMessages(threadId);
    return this.jsend.success(data);
  }
}
