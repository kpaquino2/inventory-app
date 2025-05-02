import { Injectable } from '@nestjs/common';
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

  findOne(id: number) {
    return this.prisma.category.findUnique({ where: { id } });
  }

  update(id: number, updateCategoryData: Prisma.CategoryUpdateInput) {
    return this.prisma.category.update({
      where: { id },
      data: updateCategoryData,
    });
  }

  remove(id: number) {
    return this.prisma.category.delete({ where: { id } });
  }
}
