import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}

  create(createCategoryData: Prisma.CategoryCreateInput) {
    return this.prisma.category.create({ data: createCategoryData });
  }

  findAll() {
    return this.prisma.category.findMany();
  }

  async findOne(id: number) {
    const category = await this.prisma.category.findUnique({ where: { id } });
    if (!category)
      throw new NotFoundException(`Category with ID ${id} not found`);
    return category;
  }

  async update(id: number, updateCategoryData: Prisma.CategoryUpdateInput) {
    try {
      return await this.prisma.category.update({
        where: { id },
        data: updateCategoryData,
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(`Category with ID ${id} not found`);
      }
    }
  }

  async remove(id: number) {
    try {
      return await this.prisma.category.delete({ where: { id } });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(`Category with ID ${id} not found`);
      }
    }
  }
}
