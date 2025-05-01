import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from 'generated/prisma';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}

  create(
    categoryId: number,
    createProductData: Prisma.ProductCreateWithoutCategoryInput,
  ) {
    return this.prisma.product.create({
      data: { ...createProductData, categoryId },
    });
  }

  findAll() {
    return this.prisma.product.findMany();
  }

  findOne(id: number) {
    return this.prisma.product.findUnique({ where: { id } });
  }

  update(id: number, updateProductData: Prisma.ProductUpdateInput) {
    return this.prisma.product.update({
      where: { id },
      data: updateProductData,
    });
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
