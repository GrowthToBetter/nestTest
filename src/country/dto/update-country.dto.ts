import { PartialType } from '@nestjs/mapped-types';
import { CreateCountryDto } from './create-country.dto';
import { IsOptional, IsString } from 'class-validator';
export class UpdateCountryDto extends PartialType(CreateCountryDto) {
  @IsOptional()
  @IsString()
  code: string;
  @IsOptional()
  @IsString()
  name: string;
  @IsOptional()
  @IsString()
  continent: string;
  @IsOptional()
  @IsString()
  capital: string;
  @IsOptional()
  @IsString()
  population: string;
}
