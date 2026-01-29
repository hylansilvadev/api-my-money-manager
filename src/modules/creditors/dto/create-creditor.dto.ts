import { IsString, IsOptional } from 'class-validator';

export class CreateCreditorDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  phone?: string;
}
