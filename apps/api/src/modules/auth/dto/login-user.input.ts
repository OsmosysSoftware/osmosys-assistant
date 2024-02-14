import { IsNotEmpty } from 'class-validator';

export class LoginUserInput {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;
}
