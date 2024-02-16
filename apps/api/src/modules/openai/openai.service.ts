import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SendMessageDto } from './dto/sendMessage.dto';
import { OpenAI } from 'openai';

@Injectable()
export class OpenaiService {
  private readonly openai: OpenAI;

  constructor(private configService: ConfigService) {
    this.openai = new OpenAI({
      apiKey: this.configService.getOrThrow<string>('OPENAI_API_KEY'),
    });
  }

  async sendMessage(message: SendMessageDto): Promise<OpenAI.Beta.Threads.ThreadMessage[]> {
    if (!message.userQuery.trim()) {
      throw new BadRequestException('Please provide a message.');
    }

    try {
      if (!message.threadId) {
        const thread = await this.createThread(message.userQuery);
        message.threadId = thread.id;
      } else {
        await this.createMessage(message.userQuery, message.threadId);
      }

      const run = await this.createRun(message.threadId, message.assistantId);
      const data = await this.waitForRunCompletion(message.threadId, run.id);
      return data;
    } catch (error) {
      throw new InternalServerErrorException('Failed to send message to OpenAI: ' + error.message);
    }
  }

  async getThreadMessages(threadId: string): Promise<OpenAI.Beta.Threads.ThreadMessage[]> {
    try {
      const messages = await this.openai.beta.threads.messages.list(threadId);
      return messages.data;
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to retrieve thread messages: ' + error.message,
      );
    }
  }

  private async createThread(message: string): Promise<OpenAI.Beta.Threads.Thread> {
    try {
      const thread = await this.openai.beta.threads.create({
        messages: [{ role: 'user', content: message }],
      });
      return thread;
    } catch (error) {
      throw new InternalServerErrorException('Failed to create a new thread: ' + error.message);
    }
  }

  private async createMessage(message: string, threadId: string): Promise<void> {
    try {
      await this.openai.beta.threads.messages.create(threadId, {
        role: 'user',
        content: message,
      });
    } catch (error) {
      throw new InternalServerErrorException('Failed to create a new message: ' + error.message);
    }
  }

  private async createRun(
    threadId: string,
    assistantId: string,
  ): Promise<OpenAI.Beta.Threads.Runs.Run> {
    try {
      const run = await this.openai.beta.threads.runs.create(threadId, {
        assistant_id: assistantId,
      });
      return run;
    } catch (error) {
      throw new InternalServerErrorException('Failed to create a new run: ' + error.message);
    }
  }

  private async waitForRunCompletion(
    threadId: string,
    runId: string,
    maxRetries: number = 10,
  ): Promise<OpenAI.Beta.Threads.ThreadMessage[]> {
    const POLLING_DELAY_IN_MS = 3000;

    for (let retries = 0; retries < maxRetries; retries++) {
      const run = await this.openai.beta.threads.runs.retrieve(threadId, runId);

      if (run.completed_at) {
        const messages = await this.getThreadMessages(threadId);
        return messages;
      }

      await this.sleep(POLLING_DELAY_IN_MS);
    }

    throw new InternalServerErrorException('Run did not complete in the expected time.');
  }

  private async sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
