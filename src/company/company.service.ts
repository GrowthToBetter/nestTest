import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { company } from '@prisma/client';

@Injectable()
export class CompanyService {
  constructor(private prisma: PrismaService) {}
  async create(data: CreateCompanyDto) {

    try {
      return await this.prisma.company.create({ data });
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new InternalServerErrorException(error.message);
      }
      throw new InternalServerErrorException('Unexpected error');
    }
  }

  async findAll(): Promise<company[]> {
    return await this.prisma.company.findMany();
  }

  async findOne(id: string): Promise<company> {
    try {
      const user = await this.prisma.company.findUnique({ where: { id } });
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

  async update(id: string, data: UpdateCompanyDto): Promise<company> {
    try {
      const findCountry = await this.prisma.company.findUnique({
        where: { id },
      });
      if (!findCountry) {
        throw new NotFoundException(`Country with ID ${id} not found`);
      }
      return await this.prisma.company.update({
        where: { id },
        data: {
          name: data.name ?? findCountry.name,
          user:{connect:{id:data.user_id ?? findCountry.user_id}}
        },
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new InternalServerErrorException(error.message);
      }
      throw new InternalServerErrorException('Unexpected error');
    }
  }

  async remove(id: string): Promise<company> {
    try {
      return await this.prisma.company.delete({ where: { id } });
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new InternalServerErrorException(error.message);
      }
      throw new InternalServerErrorException('Unexpected error');
    }
  }
}
