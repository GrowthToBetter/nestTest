import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { CountryModule } from './country/country.module';
import { CityModule } from './city/city.module';

@Module({
  imports: [UsersModule, PrismaModule, CountryModule, CityModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
