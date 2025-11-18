import { PartialType } from '@nestjs/mapped-types';
import { CreateSocietyDto } from './create-society.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateSocietyDto extends PartialType(CreateSocietyDto) {
  @IsOptional()
  @IsString()
  name: string;
}
