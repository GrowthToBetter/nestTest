import { IsString } from 'class-validator';

export class AddCompanyToSocietyDto {

  @IsString()
  society_id: string;
}