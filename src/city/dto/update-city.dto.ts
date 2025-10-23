import { PartialType } from '@nestjs/mapped-types';
import { CreateCityDto } from './create-city.dto';
import { IsOptional, IsString } from 'class-validator';
export class UpdateCityDto extends PartialType(CreateCityDto) {
  @IsOptional()
  @IsString()
  district: string;
  @IsOptional()
  @IsString()
  population: string;
  @IsOptional()
  @IsString()
  country_id?: string;
}
