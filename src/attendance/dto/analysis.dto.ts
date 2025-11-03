// attendance/dto/analysis.dto.ts
import { IsOptional, IsString, IsDateString } from 'class-validator';

export class AnalysisDto {
  @IsOptional() @IsDateString() from?: string;
  @IsOptional() @IsDateString() to?: string;
  @IsOptional() @IsString() groupBy?: string; // 'group' or 'role' or 'user'
  @IsOptional() @IsString() filterGroup?: string; // e.g. kelas A
}