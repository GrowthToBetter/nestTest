import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateCountryDto } from './dto/create-country.dto';
import { UpdateCountryDto } from './dto/update-country.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { country } from '@prisma/client';

@Injectable()
export class CountryService {
  constructor(private prisma: PrismaService) {}
  async create(data: CreateCountryDto) {
    try {
      return await this.prisma.country.create({ data });
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new InternalServerErrorException(error.message);
      }
      throw new InternalServerErrorException('Unexpected error');
    }
  }

  async findAll(): Promise<country[]> {
    return await this.prisma.country.findMany();
  }

  async findOne(id: string): Promise<country> {
    try {
      const user = await this.prisma.country.findUnique({ where: { id } });
      if (!user) {
        throw new NotFoundException(`Country with ID ${id} not found`);
      }
      return user;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new InternalServerErrorException(error.message);
      }
      throw new InternalServerErrorException('Unexpected error');
    }
  }

  async update(id: string, data: UpdateCountryDto): Promise<country> {
    try {
      return await this.prisma.country.update({ where: { id }, data });
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new InternalServerErrorException(error.message);
      }
      throw new InternalServerErrorException('Unexpected error');
    }
  }

  async remove(id: string): Promise<country> {
    try {
      return await this.prisma.country.delete({ where: { id } });
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new InternalServerErrorException(error.message);
      }  
      throw new InternalServerErrorException('Unexpected error');
    }
  }
}
