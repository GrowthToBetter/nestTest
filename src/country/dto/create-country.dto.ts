import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateCountryDto {
  @IsNotEmpty()
  @IsString()
  code: string;
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsNotEmpty()
  @IsString()
  continent: string;
  @IsNotEmpty()
  @IsString()
  capital: string;
  @IsNotEmpty()
  @IsString()
  population: string;
}
