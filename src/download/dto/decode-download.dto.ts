import { IsNotEmpty, IsString } from 'class-validator';

export class DecodeDownloadDto {
  @IsString()
  @IsNotEmpty()
  code!: string;
}
