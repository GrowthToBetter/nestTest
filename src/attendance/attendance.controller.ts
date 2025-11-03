// attendance/attendance.controller.ts
import { Controller, Post, Body, Get, Param, Query, UseGuards } from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { AnalysisDto } from './dto/analysis.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('attendance')
@UseGuards(JwtAuthGuard)
export class AttendanceController {
  constructor(private service: AttendanceService) {}

  @Post()
  record(@Body() dto: CreateAttendanceDto) {
    return this.service.record(dto);
  }

  @Get('history/:userId')
  history(@Param('userId') userId: string, @Query('skip') skip?: string, @Query('take') take?: string) {
    return this.service.history(userId, +(skip || 0), +(take || 50));
  }

  @Get('summary/:userId')
  summary(@Param('userId') userId: string, @Query('year') year?: string, @Query('month') month?: string) {
    const y = year ? +year : new Date().getUTCFullYear();
    const m = month ? +month : new Date().getUTCMonth() + 1;
    return this.service.monthlySummary(userId, y, m);
  }

  @Post('analysis')
  analysis(@Body() body: AnalysisDto) {
    return this.service.analysis(body);
  }
}
