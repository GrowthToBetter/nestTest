import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCityDto {
  @IsNotEmpty()
  @IsString()
  district: string;
  @IsNotEmpty()
  @IsString()
  population: string;
  @IsOptional()
  @IsString()
  country_id?: string;
}
