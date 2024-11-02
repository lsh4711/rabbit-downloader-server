import { IsNotEmpty, IsString } from 'class-validator';

export class ParseDownloadDto {
  @IsString()
  @IsNotEmpty()
  html!: string;
}
