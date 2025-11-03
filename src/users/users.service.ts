// users/users.service.ts
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import { PrismaClient, User, Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  private prisma = new PrismaClient();

  async create(data: any) {
    try {
      // Cek apakah email sudah digunakan
      const existing = await this.prisma.user.findUnique({
        where: { email: data.email },
      });
      if (existing) throw new ConflictException('Email sudah digunakan');

      const hashed = await bcrypt.hash(data.password, 10);
      const user = await this.prisma.user.create({
        data: { ...data, password: hashed },
        select: {
          id: true,
          nama: true,
          email: true,
          role: true,
          group: true,
          createdAt: true,
        },
      });
      return user;
    } catch (error) {
      this.handleError(error, 'Gagal membuat user');
    }
  }

  async findAll() {
    try {
      return await this.prisma.user.findMany({
        select: {
          id: true,
          nama: true,
          email: true,
          role: true,
          group: true,
          createdAt: true,
        },
      });
    } catch (error) {
      this.handleError(error, 'Gagal mengambil data user');
    }
  }

  async findOne(id: string) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id },
        select: {
          id: true,
          nama: true,
          email: true,
          role: true,
          group: true,
          createdAt: true,
        },
      });
      if (!user) throw new NotFoundException('User tidak ditemukan');
      return user;
    } catch (error) {
      this.handleError(error, 'Gagal mencari user');
    }
  }

  async update(id: string, data: any) {
    try {
      const existing = await this.prisma.user.findUnique({ where: { id } });
      if (!existing) throw new NotFoundException('User tidak ditemukan');

      if (data.password)
        data.password = await bcrypt.hash(data.password, 10);

      const updated = await this.prisma.user.update({
        where: { id },
        data,
        select: {
          id: true,
          nama: true,
          email: true,
          role: true,
          group: true,
          updatedAt: true,
        },
      });
      return updated;
    } catch (error) {
      this.handleError(error, 'Gagal memperbarui user');
    }
  }

  async remove(id: string) {
    try {
      const existing = await this.prisma.user.findUnique({ where: { id } });
      if (!existing) throw new NotFoundException('User tidak ditemukan');

      await this.prisma.user.delete({ where: { id } });
      return { success: true, message: 'User berhasil dihapus' };
    } catch (error) {
      this.handleError(error, 'Gagal menghapus user');
    }
  }

  async findEmail(email: string): Promise<User> {
    try {
      const user = await this.prisma.user.findUnique({ where: { email } });
      if (!user)
        throw new NotFoundException(`User dengan email ${email} tidak ditemukan`);
      return user;
    } catch (error) {
      this.handleError(error, 'Gagal mencari user berdasarkan email');
    }
  }

  /**
   * 🛠️ Centralized Error Handler
   * Digunakan untuk menstandardisasi semua error Prisma dan lainnya.
   */
  private handleError(error: any, context: string): never {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      switch (error.code) {
        case 'P2002':
          throw new ConflictException(`${context}: Data duplikat (unique constraint gagal)`);
        case 'P2003':
          throw new BadRequestException(`${context}: Foreign key constraint gagal`);
        case 'P2025':
          throw new NotFoundException(`${context}: Data tidak ditemukan`);
        default:
          throw new InternalServerErrorException(`${context}: ${error.message}`);
      }
    }

    if (error instanceof NotFoundException || 
        error instanceof BadRequestException || 
        error instanceof ConflictException) {
      throw error;
    }

    console.error(`[${context}]`, error);
    throw new InternalServerErrorException(`${context}: ${error.message || 'Terjadi kesalahan internal'}`);
  }
}
