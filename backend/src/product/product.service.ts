import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

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

  findAll({
    search,
    categoryId,
    page = 1, // Default: Page 1
    limit = 10, // Default: 10 items per page
  }: {
    search?: string;
    categoryId?: number;
    page?: number;
    limit?: number;
  }) {
    // filters by search query or categoryId, whichever is present
    return this.prisma.product.findMany({
      where: {
        OR: search
          ? [
              { name: { contains: search, mode: 'insensitive' } },
              { desc: { contains: search, mode: 'insensitive' } },
            ]
          : undefined,
        ...(categoryId && {
          categoryId: categoryId,
        }),
      },
      skip: (page - 1) * limit, // calculate offset (e.g., page 2 → skip 10)
      take: limit, // number of items per page
    });
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
    return this.prisma.product.delete({ where: { id } });
  }
}
