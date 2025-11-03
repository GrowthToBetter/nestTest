import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { CountryModule } from './country/country.module';
import { CityModule } from './city/city.module';
import { AuthModule } from './auth/auth.module';
import { AttendanceModule } from './attendance/attendance.module';

@Module({
  imports: [UsersModule, PrismaModule, CountryModule, CityModule, AuthModule, AttendanceModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
