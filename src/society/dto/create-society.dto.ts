import { IsNotEmpty, IsString } from "class-validator";

export class CreateSocietyDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}
