import { IsString, IsInt } from 'class-validator';

export class SignInDto {
  @IsString()
  token: string;
}
