import { IsString, IsOptional } from 'class-validator';

export class SendMessageDto {
  @IsString()
  assistantId: string;

  @IsString()
  @IsOptional()
  threadId: string;

  @IsString()
  userQuery: string;
}
