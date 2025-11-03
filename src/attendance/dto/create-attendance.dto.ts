// attendance/dto/create-attendance.dto.ts
import { IsNotEmpty, IsString, IsUUID, IsOptional, IsDateString } from 'class-validator';

export class CreateAttendanceDto {
  @IsNotEmpty() @IsUUID() userId: string;
  @IsNotEmpty() @IsDateString() date: string; // ISO date string (YYYY-MM-DD)
  @IsNotEmpty() @IsString() status: string; // present|absent|late|izin
  @IsOptional() @IsString() note?: string;
}


