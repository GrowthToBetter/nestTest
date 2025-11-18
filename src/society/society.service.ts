import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateSocietyDto } from './dto/create-society.dto';
import { UpdateSocietyDto } from './dto/update-society.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { company, Society } from '@prisma/client';
import { UpdateCompanyDto } from 'src/company/dto/update-company.dto';

@Injectable()
export class SocietyService {
  constructor(private prisma: PrismaService) {}
  async create(data: CreateSocietyDto) {
    try {
      return await this.prisma.society.create({ data });
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new InternalServerErrorException(error.message);
      }
      throw new InternalServerErrorException('Unexpected error');
    }
  }

  async findAll(): Promise<Society[]> {
    return await this.prisma.society.findMany();
  }

  async findOne(id: string): Promise<Society> {
    try {
      const user = await this.prisma.society.findUnique({ where: { id } });
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

  async update(id: string, data: UpdateSocietyDto): Promise<Society> {
    try {
      const findCountry = await this.prisma.society.findUnique({
        where: { id },
      });
      if (!findCountry) {
        throw new NotFoundException(`Country with ID ${id} not found`);
      }
      return await this.prisma.society.update({
        where: { id },
        data: {
          name: data.name ?? findCountry.name,
        },
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new InternalServerErrorException(error.message);
      }
      throw new InternalServerErrorException('Unexpected error');
    }
  }

  async remove(id: string): Promise<Society> {
    try {
      return await this.prisma.society.delete({ where: { id } });
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new InternalServerErrorException(error.message);
      }
      throw new InternalServerErrorException('Unexpected error');
    }
  }
  async addCompanyToSociety(company_id: string, society_id: string) {
    try {
      const company = await this.prisma.company.findUnique({
        where: { id: company_id },
      });
      if (!company) {
        throw new NotFoundException(`Company with ID ${company_id} not found`);
      }

      const society = await this.prisma.society.findUnique({
        where: { id: society_id },
      });
      if (!society) {
        throw new NotFoundException(`Society with ID ${society_id} not found`);
      }

      return await this.prisma.societyToCompany.create({
        data: {
          company_id,
          society_id,
        },
      });
    } catch (error) {
      if (error instanceof Error) {
        throw new InternalServerErrorException(error.message);
      }
      throw new InternalServerErrorException('Unexpected error');
    }
  }
  async getCompany(user_id: string): Promise<company> {
    const company = await this.prisma.company.findUnique({
      where: { user_id: user_id },
    });
    if (!company) {
      throw new NotFoundException(`Company with ID ${user_id} not found`);
    }
    return company;
  }
}
