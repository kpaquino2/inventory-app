import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from './product.service';
import { PrismaService } from '../prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';

const prismaMock = {
  product: {
    create: jest.fn(),
    findMany: jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
};

describe('ProductService', () => {
  let service: ProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: PrismaService,
          useValue: prismaMock,
        },
      ],
    }).compile();

    service = module.get<ProductService>(ProductService);
  });

  describe('create', () => {
    it('should call create with the correct data', async () => {
      const categoryId = 1;
      const productData = {
        name: 'Test Product',
        desc: 'A great product',
        price: 99.99,
      };

      const expected = {
        id: 1,
        ...productData,
        categoryId,
      };

      prismaMock.product.create.mockResolvedValue(expected);

      const result = await service.create(categoryId, productData);

      expect(prismaMock.product.create).toHaveBeenCalledWith({
        data: { ...productData, categoryId },
      });

      expect(result).toEqual(expected);
    });
  });

  describe('findAll', () => {
    const mockProducts = [
      { id: 1, name: 'Product 1', desc: 'Desc 1', price: 100, categoryId: 1 },
      { id: 2, name: 'Product 2', desc: 'Desc 2', price: 200, categoryId: 1 },
    ];

    it('should return all products with default pagination', async () => {
      prismaMock.product.findMany.mockResolvedValue(mockProducts);

      const result = await service.findAll({ limit: 10, page: 1 });

      expect(result).toEqual(mockProducts);
      expect(prismaMock.product.findMany).toHaveBeenCalledWith({
        where: { OR: undefined },
        skip: 0,
        take: 10,
      });
    });

    it('should filter by search term', async () => {
      prismaMock.product.findMany.mockResolvedValue([mockProducts[0]]);

      const result = await service.findAll({
        search: 'Product 1',
        limit: 10,
        page: 1,
      });

      expect(result).toHaveLength(1);
      expect(prismaMock.product.findMany).toHaveBeenCalledWith({
        where: {
          OR: [
            { name: { contains: 'Product 1', mode: 'insensitive' } },
            { desc: { contains: 'Product 1', mode: 'insensitive' } },
          ],
        },
        skip: 0,
        take: 10,
      });
    });

    it('should filter by categoryId', async () => {
      prismaMock.product.findMany.mockResolvedValue(mockProducts);

      const result = await service.findAll({
        categoryId: 1,
        limit: 10,
        page: 1,
      });

      expect(result).toEqual(mockProducts);
      expect(prismaMock.product.findMany).toHaveBeenCalledWith({
        where: { categoryId: 1 },
        skip: 0,
        take: 10,
      });
    });

    it('should apply pagination', async () => {
      prismaMock.product.findMany.mockResolvedValue([mockProducts[1]]);

      const result = await service.findAll({ page: 2, limit: 1 });

      expect(result).toHaveLength(1);
      expect(prismaMock.product.findMany).toHaveBeenCalledWith({
        where: { OR: undefined },
        skip: 1,
        take: 1,
      });
    });
  });

  describe('findOne', () => {
    it('should return a single product by id', async () => {
      const mockProduct = {
        id: 1,
        name: 'Test Product',
        desc: 'Test Description',
        price: 100,
        categoryId: 1,
      };

      prismaMock.product.findUnique.mockResolvedValue(mockProduct);

      const result = await service.findOne(1);

      expect(result).toEqual(mockProduct);
      expect(prismaMock.product.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });

    it('should throw NotFoundException when product not found', async () => {
      prismaMock.product.findUnique.mockResolvedValue(null);
      await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update a product', async () => {
      const updatedProduct = {
        id: 1,
        name: 'Updated Product',
        desc: 'Updated Description',
        price: 150,
        categoryId: 1,
      };

      prismaMock.product.update.mockResolvedValue(updatedProduct);

      const result = await service.update(1, {
        name: 'Updated Product',
        desc: 'Updated Description',
        price: 150,
      });

      expect(result).toEqual(updatedProduct);
      expect(prismaMock.product.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: {
          name: 'Updated Product',
          desc: 'Updated Description',
          price: 150,
        },
      });
    });

    it('should throw NotFoundException when product not found', async () => {
      const prismaError = new Prisma.PrismaClientKnownRequestError(
        'Record not found',
        { code: 'P2025', clientVersion: '1.0' },
      );

      prismaMock.product.update.mockRejectedValue(prismaError);

      await expect(service.update(999, { name: 'Test' })).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('remove', () => {
    it('should delete a product', async () => {
      const mockProduct = {
        id: 1,
        name: 'Test Product',
        desc: 'Test Description',
        price: 100,
        categoryId: 1,
      };

      prismaMock.product.delete.mockResolvedValue(mockProduct);

      const result = await service.remove(1);

      expect(result).toEqual(mockProduct);
      expect(prismaMock.product.delete).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });

    it('should throw NotFoundException when deleting non-existent product', async () => {
      const prismaError = new Prisma.PrismaClientKnownRequestError(
        'Record not found',
        { code: 'P2025', clientVersion: '1.0' },
      );

      prismaMock.product.delete.mockRejectedValue(prismaError);

      await expect(service.remove(999)).rejects.toThrow(NotFoundException);
    });
  });
});
