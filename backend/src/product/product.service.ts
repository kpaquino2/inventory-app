import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { GetProductsDto } from './dto/get-products.dto';

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

  findAll({ search, categoryId, page, limit }: GetProductsDto) {
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

  async findOne(id: number) {
    const product = await this.prisma.product.findUnique({ where: { id } });
    if (!product)
      throw new NotFoundException(`Product with ID ${id} not found`);
    return product;
  }

  async update(id: number, updateProductData: Prisma.ProductUpdateInput) {
    try {
      return await this.prisma.product.update({
        where: { id },
        data: updateProductData,
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025' // Prisma's "Record not found" error code
      ) {
        throw new NotFoundException(`Product with ID ${id} not found`);
      }
      throw error; // Re-throw other errors
    }
  }

  async remove(id: number) {
    try {
      return await this.prisma.product.delete({ where: { id } });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025' // Prisma's "Record not found" error code
      ) {
        throw new NotFoundException(`Product with ID ${id} not found`);
      }
      throw error; // Re-throw other errors
    }
  }
}
