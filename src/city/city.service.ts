import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { City as city, Prisma } from '@prisma/client';

@Injectable()
export class CityService {
  constructor(private prisma: PrismaService) {}
  async create(data: CreateCityDto) {
    try {
      return await this.prisma.city.create({ data });
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new InternalServerErrorException(error.message);
      }
      throw new InternalServerErrorException('Unexpected error');
    }
  }

  async findAll(params?: {
    page?: number;
    limit?: number;
    search?: string;
  }): Promise<{
    data: city[];
    total: number;
    page: number;
    limit: number;
  }> {
    const { page = 1, limit = 10, search = '' } = params || {};

    const skip = (page - 1) * limit;

    const where: Prisma.CityWhereInput = search
      ? {
          OR: [
            { district: { contains: search, mode: 'insensitive' } },
            { country: { name: { contains: search, mode: 'insensitive' } } },
          ],
        }
      : {};

    const [data, total] = await Promise.all([
      this.prisma.city.findMany({
        where,
        skip,
        take: limit,
        orderBy: { district: 'asc' },
      }),
      this.prisma.city.count({ where }),
    ]);

    return {
      data,
      total,
      page,
      limit,
    };
  }

  async findOne(id: string): Promise<city> {
    try {
      const user = await this.prisma.city.findUnique({ where: { id } });
      if (!user) {
        throw new NotFoundException(`city with ID ${id} not found`);
      }
      return user;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new InternalServerErrorException(error.message);
      }
      throw new InternalServerErrorException('Unexpected error');
    }
  }

  async update(id: string, data: UpdateCityDto): Promise<city> {
    try {
      const findCity = await this.prisma.city.findUnique({
        where: { id },
      });
      if (!findCity) {
        throw new NotFoundException(`City with ID ${id} not found`);
      }
      return await this.prisma.city.update({
        where: { id },
        data: {
          country_id: data.country_id ?? findCity.country_id,
          district: data.district ?? findCity.district,
          population: data.population ?? findCity.population,
        },
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new InternalServerErrorException(error.message);
      }
      throw new InternalServerErrorException('Unexpected error');
    }
  }

  async remove(id: string): Promise<city> {
    try {
      return await this.prisma.city.delete({ where: { id } });
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new InternalServerErrorException(error.message);
      }
      throw new InternalServerErrorException('Unexpected error');
    }
  }
}
